export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-nuxt-events'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '',
                  title: 'Sanity Studio',
                  name: 'petre-elmendorff-studio',
                  apiId: '85b31aad-d855-4ed8-8d4a-abac2c31e78d'
                },
                {
                  buildHookId: '5fc2d677330a58180cac2eaa',
                  title: 'Events Website',
                  name: 'petre-elmendorff',
                  apiId: 'bfb6bfdf-8755-4a54-986f-225677c8625f'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/dignitas123/petre-elmendorff',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://petre-elmendorff.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recently created sessions', order: '_createdAt desc', types: ['session']},
      layout: {width: 'medium'}
    }
  ]
}
