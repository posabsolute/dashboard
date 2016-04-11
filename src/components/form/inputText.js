/**
 * @api /components/form/inputText InputText
 * @apiName inputText
 * @apiGroup Component
 * @apiDescription
 * An input element that also contain validation
 * @apiExample {html} Example:
 *  <InputText
 *    name="count"
 *    placeholder="Number of tweets"
 *    classes="input-line"
 *    errorLabel="true"
 *    defaultValue={configs.count}
 *    validate={validate}
 *  />
 *
 * @apiParam {String} name The name of the input, also used in the valdation model
 * @apiParam {String} placeholder
 * @apiParam {String} classes CSS classes added to the input
 * @apiParam {String} labelText Text to show with the input
 * @apiParam {bool} errorLabel Show error label when the input do not validate
 * @apiParam {String} defaultValue Default value shown on render
 * @apiParam {bool} isPassword Use a password input type
 * @apiParam {Object} validate Validation props passed by redux-form-validator
 */


import React from 'react';
import {LabelError} from 'redux-form-validator';

import 'style!./input-line.scss';

export default ({validate, classes, name, defaultValue, value, errorLabel, placeholder, isPassword, labelText}) => {
  const Label = (errorLabel === 'true' && validate.fieldStore(name).valid === false) ? <LabelError field={validate.fieldStore(name)} /> : <div className="label-text">{labelText}</div>;
  const cssClasses = validate ? validate.classes(classes, name) : classes;
  const validateProps = validate ? validate : {};
  const type = isPassword === 'true' ? 'password' : 'text';

  return (
    <div className="form-group">
      {errorLabel === 'true' || labelText ? Label : null}
      <input type={type} autoCapitalize="off" autoCorrect="off" className={cssClasses} defaultValue={defaultValue} value={value} name={name} placeholder={placeholder} {...validateProps} />
    </div>
  );
};
