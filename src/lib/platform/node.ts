const importNodeModule = async (moduleId: string) => await import(moduleId);

const modules = {
  // make it like that so static analyzer of webpack won't bundle it
  fs: () => importNodeModule('node:fs') as Promise<typeof import('node:fs')>,
  path: () => importNodeModule('node:path') as Promise<typeof import('node:path')>,
  form_data: () => importNodeModule('form-data') as Promise<typeof import('form-data')>,
};

export default modules;
