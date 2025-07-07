import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

const NotifierContext = createContext();

export const NotifierProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const timers = useRef(new Map());

  const removeMessage = useCallback(id => {
    setMessages(msgs => msgs.filter(msg => msg.id !== id));
    const timeout = timers.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timers.current.delete(id);
    }
  }, []);

  const scheduleRemoval = (id, delay = 3000) => {
    const timeout = setTimeout(() => {
      removeMessage(id);
    }, delay);
    timers.current.set(id, timeout);
  };

  const addMessage = useCallback(
    (text, type = 'info') => {
      const id = Date.now();
      setMessages(msgs => [...msgs, { id, text, type }]);
      scheduleRemoval(id);
    },
    [removeMessage]
  );

  const pauseTimer = id => {
    const timeout = timers.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timers.current.delete(id);
    }
  };

  const resumeTimer = id => {
    scheduleRemoval(id, 1500);
  };

  const value = {
    messages,
    addMessage,
    removeMessage,
    pauseTimer,
    resumeTimer,
  };

  return (
    <NotifierContext.Provider value={value}>
      {children}
    </NotifierContext.Provider>
  );
};

export function useNotifier() {
  return useContext(NotifierContext);
}
