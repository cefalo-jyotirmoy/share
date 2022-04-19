import type { RenderConfigScreenCtx } from 'datocms-plugin-sdk'
import {
    Button,
    Canvas,
    TextField,
    Form,
    FieldGroup,
} from 'datocms-react-ui'
import {
    Form as FormHandler,
    Field,
    FormRenderProps,
    FieldRenderProps,
} from 'react-final-form'

type Props = {
    ctx: RenderConfigScreenCtx
}

type ConfigParams =
    | {
    mapUrl: string
    debugMode: boolean
}
    | Record<string, never>

const ConfigScreen = ({ ctx }: Props) => {
    const params = ctx.plugin.attributes.parameters as ConfigParams

    return (
        <Canvas ctx={ctx}>
            <p>Welcome to your plugin! This is your config screen!</p>
            <FormHandler<ConfigParams>
                initialValues={params}
                validate={(values) => {
                    const errors: Record<string, string> = {}
                    if (!values.mapUrl) {
                        errors.title = 'This field is required!'
                    }
                    return errors
                }}
                onSubmit={async (values) => {
                    await ctx.updatePluginParameters(values)
                    ctx.notice('Settings updated successfully!')
                }}
            >
                {({ handleSubmit, submitting, dirty }: FormRenderProps) => (
                    <Form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field name="mapUrl">
                                {({
                                      input,
                                      meta: { error },
                                  }: FieldRenderProps<string, HTMLElement>) => (
                                    <TextField
                                        id="mapUrl"
                                        label="Map URL"
                                        hint="Map URL"
                                        placeholder=""
                                        required
                                        error={error}
                                        {...input}
                                    />
                                )}
                            </Field>
                        </FieldGroup>
                        <Button
                            type="submit"
                            fullWidth
                            buttonSize="l"
                            buttonType="primary"
                            disabled={submitting || !dirty}
                        >
                            Save settings
                        </Button>
                    </Form>
                )}
            </FormHandler>
        </Canvas>
    )
}

export type { ConfigParams }

export default ConfigScreen
