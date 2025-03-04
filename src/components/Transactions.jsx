import Filters from "./Filters";
import TransactionsList from "./TransactionsList";

function Transactions() {
    return (
        <div>
            <Filters />
            <TransactionsList />
        </div>
    );
}

export default Transactions;