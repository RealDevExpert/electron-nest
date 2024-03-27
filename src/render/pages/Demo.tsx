import { PageContainer } from '@ant-design/pro-components';
import { useMount } from 'ahooks';
import { useState } from 'react';

function Demo() {
  const [msg, setMsg] = useState('');

  useMount(() => {
    window.electron.onHello((msg) => {
      console.log(msg);
    });
  });

  return (
    <PageContainer>
      <div>
        <input
          type="text"
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <button
          onClick={async () => {
            const result = await window.electron.echo(msg);
            console.log(result);
          }}
        >
          send
        </button>
      </div>
    </PageContainer>
  );
}

export default Demo;
