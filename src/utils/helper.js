import { SiteClient } from 'datocms-client'

export const saveCall = async (ctxProp, fields) =>{
  const allFieldDef = await getFieldDef(ctxProp)
  const allLocalizedFields = await getFieldLocal(ctxProp)
  const allRichFields = await getRichField(ctxProp)

  let emptyField = ''
  for (const property in fields) {
    if(allFieldDef.includes(property)){
      if(!allRichFields.includes(property)){
        if(allLocalizedFields.includes(property)){
          if(!fields[property].no){
            emptyField = property
            console.log(fields[property])
          }
        }else{
          if(!fields[property]){
            emptyField = property
          }
        }
      }
    }
  }


  if(emptyField === ''){
    try{
      ctxProp.saveCurrentItem(false)
    }catch (error){
      console.log(error)
    }

  }
  console.log("empty filed: "+emptyField)

  console.log("from save call")
}


export const getRichField = async (ctxProp) =>{
  const itemDef = []
  const allFields = ctxProp?.fields

  if(allFields) {

    for (const property in allFields) {
      if(allFields[property].relationships.item_type.data.id === ctxProp.itemType.id){
        const field = allFields[property].attributes
        if(field && field.appearance && field.appearance.editor==="structured_text"){
          itemDef.push(field.api_key)
        }
      }
    }
  }
  return itemDef
}

export const getFieldLocal = async (ctxProp) =>{
  const itemDef = []
  const allFields = ctxProp?.fields
  if(allFields) {

    for (const property in allFields) {
      if(allFields[property].relationships.item_type.data.id === ctxProp.itemType.id){
        const field = allFields[property].attributes
        if(field && field.localized){
          itemDef.push(field.api_key)
        }
      }
    }
  }
  return itemDef
}

export const getFieldDef = async (ctxProp) =>{
  const itemDef = []
  const allFields = ctxProp?.fields

  if(allFields) {

    for (const property in allFields) {
      if(allFields[property].relationships.item_type.data.id === ctxProp.itemType.id){
        const field = allFields[property].attributes
        if(field && field.validators && field.validators.required){

          itemDef.push(field.api_key)
        }
      }
    }
  }
  return itemDef
}

export const getItemCall = async (itemId, ctxProp) =>{
  const client = new SiteClient(ctxProp.currentUserAccessToken, {
    environment: ctxProp.environment,
  })

  try{
    const item = await client.item.find(itemId, {
      nested: 'true',
    });
    return item
  }catch (e) {
  }
}
