const LoadingBackup = () => {
    return (
        <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
            <div className="flex justify-center items-center mt-[50vh]">
                <svg className="animate-spin h-10 w-10 mr-3 z-[60] text-primary" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" stroke="currentColor" strokeDasharray="100" strokeWidth="2" fill="none" />
                </svg>
            </div>
        </div>
    );
}

export default LoadingBackup;