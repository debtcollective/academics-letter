const fetch = require('node-fetch')
const queryString = require('query-string')

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  // Process submissions to be in Gatsby format
  const { createNode } = actions
  const processSubmission = (submission) => {
    const nodeId = createNodeId(`netlify-form-submission-${submission.number}`)
    const nodeContent = JSON.stringify(submission)
    const nodeData = Object.assign({}, submission, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `NetlifyFormSubmission`,
        content: nodeContent,
        contentDigest: createContentDigest(submission),
      },
    })

    return createNode(nodeData)
  }

  // Define urls and configuration
  const { accessToken, formId } = configOptions
  // The form detail endpoint was removed
  // We will need to fetch all the forms, filter by id and get the pages
  // This need to change
  const formListUrl = `https://api.netlify.com/api/v1/forms`
  const formSubmissionsUrl = `${formListUrl}/${formId}/submissions`

  // Fetch form details to get pageCount
  const perPage = 100
  const formListResponse = await fetch(
    `${formListUrl}?access_token=${accessToken}`
  )
  const formListData = await formListResponse.json()

  // This might be an issue if we get too many submissions
  // If something happens we will know when trying to deploy
  const formData = formListData.filter((form) => form.id === formId)[0]
  const pageCount = Math.ceil(formData.submission_count / 100)

  // Fetch form submissions by doing pageCount requests
  const promises = []
  for (let i = 1; i <= pageCount; i = i + 1) {
    const query = {
      access_token: accessToken,
      page: i,
      per_page: perPage,
    }

    const formSubmissionsResponse = await fetch(
      `${formSubmissionsUrl}?${queryString.stringify(query)}`
    )

    promises.push(await formSubmissionsResponse.json())
  }

  // Return all responses flattened and processed
  return Promise.all(promises)
    .then((submissionArrays) => [].concat.apply([], submissionArrays))
    .then((submissions) =>
      submissions.map((submission) => processSubmission(submission))
    )
}
