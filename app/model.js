import falcor from 'falcor';
import falcorDS from 'falcor-http-datasource';

let model = new falcor.Model({ source: new falcorDS('/model.json')});

export { model };