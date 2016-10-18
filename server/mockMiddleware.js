import { readFileSync } from 'fs';
import { join } from 'path';

const DELAY = 200;

export default function(req, res, next) {
  switch (req.url) {
    case '/api/users':
      setTimeout(() => {
        res.json(JSON.parse(readFileSync(join(__dirname, '../mock/user.json'), 'utf-8')));
      }, DELAY);
      break;
    default:
      next();
      break;
  }
}
