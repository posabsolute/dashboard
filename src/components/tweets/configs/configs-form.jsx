import React from 'react';
import InputText from 'components/form/inputText';
import 'style!./configs.scss';
import 'style!components/form/btn.scss';

export default ({validate, onSubmit, configs}) => (
  <form className="configs-form" onSubmit={onSubmit}>
    <h3>Configurations</h3>
    <InputText
      name="handle"
      placeholder="Twitter Handle"
      classes="input-line"
      errorLabel="true"
      labelText="Twitter Handle"
      defaultValue={configs.handle}
      validate={validate}
    />
    <InputText
      name="count"
      placeholder="Number of tweets"
      classes="input-line"
      errorLabel="true"
      labelText="Number of tweets"
      defaultValue={configs.count}
      validate={validate}
    />
    <div className="label-text">Order</div>
    <select name="order" defaultValue={configs.order}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <div className="relative"><button type="submit" className="btn" >Save</button></div>
  </form>
);
