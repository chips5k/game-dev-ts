import Visitable from './Visitable';
interface Visitor {
    visit(v: Visitable): void;
}

export default Visitor;