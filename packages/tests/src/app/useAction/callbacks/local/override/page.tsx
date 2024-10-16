'use client';

import { successAction } from '@/app/actions';
import { ApiProvider, useAction } from '@vergestack/api-react';

export default function Home() {
  return (
    <ApiProvider
      value={{
        options: {
          onStart: () => {
            fetch('/log', {
              method: 'POST',
              body: JSON.stringify({ type: 'globalOnStart' })
            });
          },
          onSuccess: (data) => {
            fetch('/log', {
              method: 'POST',
              body: JSON.stringify({ type: 'globalOnSuccess', data })
            });
          },
          onError: (errors) => {
            fetch('/log', {
              method: 'POST',
              body: JSON.stringify({ type: 'globalOnError', errors })
            });
          },
          onComplete: () => {
            fetch('/log', {
              method: 'POST',
              body: JSON.stringify({ type: 'globalOnComplete' })
            });
          }
        }
      }}
    >
      <LocalOverrideComponent />
    </ApiProvider>
  );
}

function LocalOverrideComponent() {
  const { data, execute, errors } = useAction(successAction, {
    onStart: () => {
      fetch('/log', {
        method: 'POST',
        body: JSON.stringify({ type: 'localOnStart' })
      });
    },
    onSuccess: (data) => {
      fetch('/log', {
        method: 'POST',
        body: JSON.stringify({ type: 'localOnSuccess', data })
      });
    }
  });

  return (
    <>
      <p id="data">{!data ? 'No data' : data}</p>
      <p id="error">{JSON.stringify(errors)}</p>
      <button onClick={() => execute('world')}>Execute</button>
    </>
  );
}
