import { app, errorHandler } from 'mu';
import { SemanticFile } from './lib/entities/semantic-file.js';
import bodyParser from 'body-parser';

app.use(bodyParser.text({
  type: req => /^application\/n-triples/.test(req.get('content-type'))
}));

/**
 * Health check endpoint
 * @route GET /
 * @returns {string} 200 - Service health status
 */
app.get('/', (req, res) => {
  res.send('subsidy-applications-retrieval-service is healthy and working! :)');
});

/**
 * Get a form file based on the .ttl filename. Used by the subsidy-management tool
 *
 * @param filename - query parameter representing the .ttl file path
 * @returns the content of the specified file
 */
app.get('/form-file', async function(req, res) {
  try {
    if (!req.query.filename) {
      return res.status(400).set('content-type', 'application/json').send({
        status: 400,
        message: 'Query parameter "filename" is required.'
      });
    }

    const filename = req.query.filename;

    if (!SemanticFile.exists(filename)) {
      return res.status(404).set('content-type', 'application/json').send({
        status: 404,
        message: 'File not found.'
      });
    }

    const file = new SemanticFile({ filename });
    const content = file.content;

    return res.status(200).set('content-type', file.format).send(content);
  } catch (e) {
    console.error(e);
    const response = {
      status: 500,
      message: 'Something unexpected went wrong while trying to retrieve the form file.'
    };
    return res.status(response.status).set('content-type', 'application/json').send(response);
  }
});

app.use(errorHandler);
