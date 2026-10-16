---
'@code.store/arcxp-sdk-ts': minor
---

Site API: add getWebsite, putWebsite, setDefaultWebsite, hierarchy methods (getHierarchies, getHierarchy, getWebsiteHierarchies, putHierarchy, deleteHierarchy), website group methods (getWebsiteGroups, getWebsiteGroup, addWebsiteToGroup, removeWebsiteFromGroup) and getNavigation. Add `limit` to section listing params and paging fields to the links response.

Site API fix: getSection, deleteSection and putSection now URL-encode the section id. Ids with spaces, apostrophes or a trailing space now resolve exactly. Before, a trailing space was dropped and the call hit a different id.

Content API: add `published` to search and scan params.
