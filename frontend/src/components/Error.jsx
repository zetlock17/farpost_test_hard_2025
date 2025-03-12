function Error(error) {
    return (
        <div className="text-center py-8 text-red-500 dark:text-red-400">
            <p>{error}</p>
        </div>
    );
}

export default Error;