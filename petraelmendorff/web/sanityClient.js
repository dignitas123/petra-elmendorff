import sanityClient from '@sanity/client'

export default sanityClient({
  // Find your project ID and dataset in `sanity.json` in your studio project
  // Pauls sanity project:
  projectId: 'tyn9zovs',
  dataset: 'production',
  useCdn: false

  /* 
  Das ist Niclas sanity projekt:
  projectId: 'ie6m0uwl',
  dataset: 'production',
  useCdn: true
  */

  /**
   * useCdn == true gives fast, cheap responses using a globally distributed cache.
   * Set this to false if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Transform data object to query string
   */
})
