import { RenderConfigScreenCtx } from 'datocms-plugin-sdk';
import { Canvas } from 'datocms-react-ui';

type Props = {
  ctx: RenderConfigScreenCtx;
};

export default function ConfigScreen({ ctx }: Props) {
  return (
    <Canvas ctx={ctx}>
        <p>Welcome to autosave plugin! This is your config screen!</p>
    </Canvas>
  );
}
