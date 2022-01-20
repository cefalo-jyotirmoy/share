import {
  connect,
  Field,
  FieldIntentCtx,
  RenderFieldExtensionCtx,
} from 'datocms-plugin-sdk'
import { render } from './utils/render'
import 'datocms-react-ui/styles.css'
import ConfigScreen from './entrypoints/ConfigScreen'
import AutoSave from './components/AutoSave'

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />)
  },
  overrideFieldExtensions(field: Field, ctx: FieldIntentCtx) {
    if (
        ctx.itemType.id === "1230936" &&
        ctx.currentUser.id === '19866' &&
        field.attributes.api_key === 'url'
    ) {
      return {
        addons: [{ id: 'auto-save' }],
      }
    }
  },
  renderFieldExtension(fieldExtensionId: string, ctx: RenderFieldExtensionCtx) {
    return render(<AutoSave ctx={ctx} />)
  },

})
