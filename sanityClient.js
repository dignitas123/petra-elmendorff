import sanityClient from '@sanity/client'

export default sanityClient({
  // Find your project ID and dataset in `sanity.json` in your studio project
  // Pauls sanity project:
  projectId: 'tyn9zovs',
  dataset: 'production',
  useCdn: false
})
