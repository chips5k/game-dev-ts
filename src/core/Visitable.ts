import Visitor from './Visitor';
interface Visitable {
    accept(v: Visitor): void;
}

export default Visitable;