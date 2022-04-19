import {
  connect,
  Field,
  FieldIntentCtx,
  RenderFieldExtensionCtx,
} from 'datocms-plugin-sdk'
import { render } from './utils/render'
import 'datocms-react-ui/styles.css'
import ConfigScreen from './entrypoints/ConfigScreen'
import MapGrab from './components/MapGrab'

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />)
  },
  overrideFieldExtensions(field: Field, ctx: FieldIntentCtx) {
    if ((ctx.itemType.id.toString() === "1230949" || ctx.itemType.id.toString() === "1797006" || ctx.itemType.id.toString() === "1791002" || ctx.itemType.id.toString() === "1988226")
    ) {
      return {
        addons: [{ id: 'map-grab' }],
      }
    }
  },
  renderFieldExtension(fieldExtensionId: string, ctx: RenderFieldExtensionCtx) {
    return render(<MapGrab ctx={ctx} />)
  },

})
