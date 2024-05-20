import * as Yup from 'yup';


export function init(){
  Yup.addMethod(Yup.string, 'jsonArray', function (message) {
    return this.test('jsonArray', message, function (value) {
      const { path, createError } = this;
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return true;
        }
        if (parsed.length === 0) {
          return createError({ path, message: message || 'There must be at least one item' });
        }
        return createError({ path, message: message || 'The field must be a valid JSON array' });
      } catch (err) {
        return createError({ path, message: message || 'The field must be a valid JSON' });
      }
    });
  });
}
