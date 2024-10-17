'use client';

import { errorAction } from '@/app/actions';
import { ApiProvider, useAction } from '@vergestack/api-react';

export default function Home() {
  return (
    <ApiProvider
      value={{
        options: {
          onStart: () => {
            fetch('/log', {
              method: 'POST',
              body: JSON.stringify({ type: 'onStart' })
            });
          },
          onSuccess: (data) => {
            fetch('/log', {
              method: 'POST',
              body: JSON.stringify({ type: 'onSuccess', data })
            });
          },
          onError: (errors) => {
            fetch('/log', {
              method: 'POST',
              body: JSON.stringify({ type: 'onError', errors })
            });
          },
          onComplete: () => {
            fetch('/log', {
              method: 'POST',
              body: JSON.stringify({ type: 'onComplete' })
            });
          }
        }
      }}
    >
      <ErrorComponent />
    </ApiProvider>
  );
}

function ErrorComponent() {
  const { data, execute, errors } = useAction(errorAction);

  return (
    <>
      <p id="data">{!data ? 'No data' : data}</p>
      <p id="error">{JSON.stringify(errors)}</p>
      <button onClick={() => execute('world')}>Execute</button>
    </>
  );
}
