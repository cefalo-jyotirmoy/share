import type {RenderFieldExtensionCtx} from 'datocms-plugin-sdk'
import React, {useCallback, useEffect} from 'react'
import {saveCall} from '../utils/helper'
import debounce from "lodash-es/debounce"

type AutoSaveProps = {
    ctx: RenderFieldExtensionCtx
}
const AutoSave = ({ctx}: AutoSaveProps) => {
    let counter = 0
    const fields = ctx.formValues

    /* eslint-disable */
    const verify = useCallback(
        debounce((fields:any) => {
            counter++
            console.log(counter)
            if (counter > 15) {
                saveCall(ctx, fields)
                counter = 1
            }
        }, 500), [

        ]
    );
    /* eslint-enable */


    useEffect(() => {
       verify(fields)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        ctx.formValues
    ])

    return (
        <></>
    )
}

export default AutoSave
