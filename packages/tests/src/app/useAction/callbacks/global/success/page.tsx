'use client';

import { ApiProvider, useAction } from '@vergestack/api-react';
import { successAction } from './action';

export default function Home() {
  return (
    <ApiProvider
      value={{
        options: {
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
      <SuccessComponent />
    </ApiProvider>
  );
}

function SuccessComponent() {
  const { data, execute, errors } = useAction(successAction);

  return (
    <>
      <p id="data">{!data ? 'No data' : data}</p>
      <p id="error">{JSON.stringify(errors)}</p>
      <button onClick={() => execute('world')}>Execute</button>
    </>
  );
}
