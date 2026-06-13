import { useEffect, useRef, useState } from "react";

const SearchPage = () => {
    let [keyword, setKeyword] = useState("Unfiltered")
    let [results, setResults] = useState([]);
    const tHeads = ["User ID	Device Model", "Operating System", "App Usage Time (min/day)", "Screen On Time (hours/day)", "Battery Drain (mAh/day)", "Number of Apps Installed", "Data Usage (MB/day)", "Age", "Gender", "User Behavior", "Class"];
    let tempQuery = useRef("");

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("searchResults"));
        if (stored) {
            setResults(stored)
        }
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:3000/api/data/search?filterType=${keyword}&keyword=${tempQuery.current}`);
        const data = await res.json();

        setResults(data);

        localStorage.setItem("searchResults", JSON.stringify(data));
    };

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            document.getElementById("submitBtn").click()
        }
    };

    const calculateMean = (signifyer) => {
        const data = results.map(obj => Number(obj[signifyer]))
            .filter(num => !isNaN(num));

        if (!data.length) return 0;

        let total = 0
        for (let i in data) {
            total += + data[i]
        };


        return (total / data.length).toFixed(0);
    };

    const calculateMedian = (signifyer) => {
        const data = results.map(item => Number(item[signifyer]))
            .filter(num => !isNaN(num));

        let sorted = data.sort((a, b) => a - b);

        const mid = Math.floor(sorted.length / 2);

        return sorted.length % 2 === 0 ? ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(1) : sorted[mid]
    };

    return (
        <div className="d-flex justify-content-center py-3 mb-4">
            <div className="d-flex flex-column w-75 mt-3">
                <section className="search d-flex flex-column w-75 mt-3">

                    <label>Select data point to filter search by</label>
                    <select
                        className="w-25 my-2"
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value);
                            tempQuery.current = "";
                        }}>
                        <option value="Unfiltered">Select</option>
                        <option value="Model"> Model</option>
                        <option value="Gender">Gender</option>
                        <option value="OperatingSystem">Operating System</option>
                        <option value="BehaviorClass">User Behavior Class</option>
                    </select>
                    {keyword === "Model" ? (
                        <input
                            className="w-50"
                            type="text"
                            placeholder="Search"
                            onKeyDown={handleEnter}
                            onChange={(e) => tempQuery.current = e.target.value}
                        />
                    ) : keyword === "Gender" ? (
                        <select
                            className="w-50"
                            key={keyword}
                            onKeyDown={handleEnter}
                            onChange={(e) => tempQuery.current = e.target.value}>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value={"female"}>Female</option>
                        </select>
                    ) : keyword === "OperatingSystem" ? (
                        <select
                            className="w-50"
                            key={keyword}
                            onChange={(e) => tempQuery.current = e.target.value}>
                            <option value="">Select</option>
                            <option value={"IOS"}>IOS</option>
                            <option value={"Android"}>Android</option>
                        </select>
                    ) : keyword === "BehaviorClass" ? (
                        <select
                            className="w-50"
                            key={keyword}
                            onKeyDown={handleEnter}
                            onChange={(e) => tempQuery.current = e.target.value}>
                            <option value="">Select</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    ) : <input
                        className="w-50"
                        type="text"
                        placeholder="Search"
                        onKeyDown={handleEnter}
                        onChange={(e) => tempQuery.current = e.target.value}
                    />
                    }
                    <button id="submitBtn" className="w-50 my-3" onClick={handleSearch}>Search</button>
                </section>


                <section className="results">
                    {
                        !results?.length ?
                            <div>
                                <h3>No Records To Display</h3>
                            </div> :
                            <p>{`Displaying ${results.length} results`}</p>
                    }
                    {results?.length ? (
                        <section className="row g-5 mb-4" >
                            <div className="col-sm-3">
                                <div className="card card-body d-flex flex-column align-items-center border border-dark-subtle">
                                    <h5 className="card-title">App Usage Time (min/day)</h5>
                                    <p>Average - {calculateMean("App Usage Time (min/day)")}</p>
                                    <p>Median - {calculateMedian("App Usage Time (min/day)")}</p>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card card-body px-2 d-flex flex-column align-items-center border border-dark-subtle">
                                    <h5 className="card-tytle">Screen On Time (hours/day)</h5>

                                    <p>Average - {calculateMean("Screen On Time (hours/day)")}</p>
                                    <p>Median - {calculateMedian("Screen On Time (hours/day)")}</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card card-body px-2 d-flex flex-column align-items-center border border-dark-subtle">
                                    <h5 className="card-title">Number of Apps Installed</h5>
                                    <p>Average - {calculateMean("Number of Apps Installed")}</p>
                                    <p>Median - {calculateMedian("Number of Apps Installed")}</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card card-body px-2 d-flex flex-column align-items-center border border-dark-subtle">
                                    <h5 className="card-title">Age</h5>
                                    <p>Average - {calculateMean("Age")}</p>
                                    <p>Median - {calculateMedian("Age")}</p>
                                </div>
                            </div>
                        </section>
                    ) : null}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                {tHeads.map((val) => (
                                    <th scope="col" key={val}>{val}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((item,) => (
                                <tr key={item["User ID"]}>
                                    {Object.values(item).map((val, index) =>
                                        <td key={index}>{val}</td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    )
};

export default SearchPage