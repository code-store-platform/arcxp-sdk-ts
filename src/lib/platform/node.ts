import fs from 'node:fs';
import path from 'node:path';
import FormData from 'form-data';

const modules = {
  fs: () => Promise.resolve(fs),
  path: () => Promise.resolve(path),
  form_data: () => Promise.resolve(FormData),
};

export default modules;