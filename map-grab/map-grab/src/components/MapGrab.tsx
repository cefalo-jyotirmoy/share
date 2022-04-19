import type {RenderFieldExtensionCtx} from 'datocms-plugin-sdk'
import React from 'react'
import {Canvas} from "datocms-react-ui";

type MapGrabProps = {
    ctx: RenderFieldExtensionCtx
}
const MapGrab = ({ctx}: MapGrabProps) => {
    /*let latLngPart = ''
    if(ctx && ctx.item && ctx.item.attributes.latitude && ctx.item.attributes.longitude){
        latLngPart = '&lat='+ctx.item.attributes.latitude+'&lng='+ctx.item.attributes.longitude
    }*/
    const url: any = ctx.plugin.attributes.parameters.mapUrl ?? ""

    return (
        <Canvas ctx={ctx}>
            <div style={{ marginBottom: 'var(--spacing-m)' }}>
                <b>Se kartet i fullskjerm:</b>&nbsp;&nbsp;&nbsp;
            <a
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
                target="_blank"
                href={url+"?testMode=1"}
            >
                {url}
            </a>
            </div>
        </Canvas>
    )
}

export default MapGrab
