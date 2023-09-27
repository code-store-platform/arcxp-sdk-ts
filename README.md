# arcxp-sdk-ts

<p align="left"> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>

A strongly typed set of ArcXP API's and utilities reduce the amount of work required to develop with ArcXP, starting with reducing the boilerplate code you have to write.

## Installation

Install the package with:

```
npm i @code.store/arcxp-sdk-ts
```

## Features

#### API

- Draft
- Site
- Websked
- Identity
- Sales
- Retail Events (WebSockets)
- Author
- IFX
- Migration Center

##### Usage example

```ts
import { ArcAPI } from '@code.store/arcxp-sdk-ts';

const api = ArcAPI({
  credentials: { organizationName: 'YOUR_ORG_NAME', accessToken: 'YOUR_ACCESS_TOKEN' },
  maxRPS: 10,
});
const id = await api.Draft.generateId(Date.now().toString());
```

#### Content Elements

- text
- header
- image
- quote
- interstitial_link
- raw_html
- gallery
- list
- link_list
- jwPlayer

##### Usage example

```ts
import { ContentElement } from '@code.store/arcxp-sdk-ts';

const header = ContentElement.header('Header', 4);
const text = ContentElement.text('text');
```

## Image migration example

```ts
import { ArcTypes, ArcAPI } from '@code.store/arcxp-sdk-ts';
import { ArcAPI } from '../../../arc';

const api = ArcAPI({
  credentials: { organizationName: 'YOUR_ORG_NAME', accessToken: 'YOUR_ACCESS_TOKEN' },
  maxRPS: 10,
});
const sourceImageId = 'sourceImageId';
const id = await api.Draft.generateId(sourceImageId);
const ans: ArcTypes.Story.AnImage = {
  _id: id,
  description: { basic: 'Description' },
  caption: 'Caption',
  subtitle: 'Subtitle',
  alt_text: 'Alt',
  type: 'image',
  version: '0.10.9',
  image_type: 'photograph',
  source: {
    name: 'codestore-arcxp-sdk-ts',
    system: 'codestore-arcxp-sdk-ts',
    source_id: sourceImageId,
  },
  additional_properties: {
    originalName: 'originalName',
    version: 0,
    originalUrl: 'https://picsum.photos/200',
    published: true,
  },
};

await api.MigrationCenter.postAns(
  {
    website: 'YOUR_WEBSITE',
    groupId: 'images',
    priority: 'historical',
  },
  {
    sourceId: sourceImageId,
    sourceType: 'image',
    ANS: ans,
  }
);
```

## Changesets

`npx changeset && npx changeset version`

## License

[MIT](https://choosealicense.com/licenses/mit/)
