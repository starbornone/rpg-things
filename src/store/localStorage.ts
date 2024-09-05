'use client';

const isBrowser = typeof window !== 'undefined';

export const loadState = () => {
  if (!isBrowser) {
    // Return undefined when running on the server
    return undefined;
  }

  try {
    const serializedState = localStorage.getItem('rpgThings');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state from localStorage:', err);
    return undefined;
  }
};

export const saveState = (state: any) => {
  if (!isBrowser) {
    // Do nothing on the server
    return;
  }

  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('rpgThings', serializedState);
  } catch (err) {
    console.error('Could not save state to localStorage:', err);
  }
};
