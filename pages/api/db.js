import db from '../../db.json';

export default function apiDb(req, res) {
  res.json(db);
}
