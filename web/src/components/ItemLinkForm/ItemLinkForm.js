import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const ItemLinkForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.itemLink?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="updated"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Updated
        </Label>
        <TextField
          name="updated"
          defaultValue={props.itemLink?.updated}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="updated" className="rw-field-error" />

        <Label
          name="created"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Created
        </Label>
        <TextField
          name="created"
          defaultValue={props.itemLink?.created}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="created" className="rw-field-error" />

        <Label
          name="url"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Url
        </Label>
        <TextField
          name="url"
          defaultValue={props.itemLink?.url}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="url" className="rw-field-error" />

        <Label
          name="author"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Author
        </Label>
        <TextField
          name="author"
          defaultValue={props.itemLink?.author}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="author" className="rw-field-error" />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>
        <TextField
          name="title"
          defaultValue={props.itemLink?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="title" className="rw-field-error" />

        <Label
          name="rendered"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rendered
        </Label>
        <NumberField
          name="rendered"
          defaultValue={props.itemLink?.rendered}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="rendered" className="rw-field-error" />

        <Label
          name="clicked"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Clicked
        </Label>
        <NumberField
          name="clicked"
          defaultValue={props.itemLink?.clicked}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="clicked" className="rw-field-error" />

        <Label
          name="contentType"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Content type
        </Label>
        <TextField
          name="contentType"
          defaultValue={props.itemLink?.contentType}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="contentType" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ItemLinkForm
