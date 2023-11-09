import {
  Resolvers,
} from '../.mesh';
import {
  createConnection,
  createRef,
  getObjectRefSelectionSet,
} from './libs/resolverFactory';

const objectRefASelectionSet = getObjectRefSelectionSet('objectRefA');
const objectRefBSelectionSet = getObjectRefSelectionSet('objectRefB');
const objectRefsSelectionSet = getObjectRefSelectionSet(
  'objectRefs',
  'objectRef'
);

export const resolvers: Resolvers = {};
