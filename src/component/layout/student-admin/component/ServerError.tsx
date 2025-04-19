const ServerError = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center text-center p-5 text-danger">
            <h2>500 - Internal Server Error</h2>
            <p>Oops! Something went wrong on our end. Please try again later.</p>
        </div>
    );
};

export default ServerError;
