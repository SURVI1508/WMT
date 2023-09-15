"use client";
import axios from "axios";
import { useEffect, useState } from "react";
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trainData, setTrainData] = useState([]);
  const [trainFrom, setTrainFrom] = useState("DHN");
  const [trainTo, setTrainTo] = useState("RNC");
  const [date, setDate] = useState("2023-09-15");

  const GET_TRAIN = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations",
        params: {
          fromStationCode: trainFrom,
          toStationCode: trainTo,
          dateOfJourney: date,
        },
        headers: {
          "X-RapidAPI-Key":
            "d3ed8c53d6msh54876acad4d06d0p166039jsnf1e3b45115c7",
          "X-RapidAPI-Host": "irctc1.p.rapidapi.com",
        },
      });
      setTrainData(response?.data?.data);
      setTrainFrom("");
      setTrainTo("");
      setDate("");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const SEARCH = (e) => {
    e.preventDefault();
    GET_TRAIN();
  };
  useEffect(() => {
    GET_TRAIN();
    return () => {};
  }, []);

  const design = (
    <>
      <div className="h-[100vh] w-full">
        {/* Nav bar  */}
        <div className=" bg-gray-800 h-[10vh] flex flex-row items-center justify-center gap-2">
          <div className="bg-orange-500 py-2 px-2 sm:px-3">
            <span className="font-extrabold text-[#fff]">Go Train</span>
          </div>
          <div className="">
            <span className="text-md font-bold text-gray-500">
              Search Your Train
            </span>
          </div>
          <span className="font-[400] text-[#fff] italic text-xs">
            Powered by GP Bhaga
          </span>
        </div>

        {/* Search input Field  */}
        <div className="w-full bg-green-300 h-[90vh] pt-5 sm:pt-12 relative">
          <div className="w-[95%] sm:w-[80%] mx-auto py-5 sm:py-12 rounded-lg  bg-[#d0e6ff2f] backdrop-blur-xs flex flex-row items-center justify-center relative z-[999]">
            <form
              onSubmit={SEARCH}
              className="w-[90%] grid grid-cols-1 sm:grid-cols-6 gap-2"
            >
              <div className="col-span-2">
                <input
                  value={trainFrom}
                  required
                  type="text"
                  name="from"
                  placeholder="From"
                  className="w-full border-2 outline-none border-gray-700 bg-transparent px-4 h-[3rem] font-[700] placeholder:text-red-400 placeholder:font-[400]"
                  onChange={(e) => setTrainFrom(e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <input
                  value={trainTo}
                  required
                  type="text"
                  name="to"
                  placeholder="To"
                  className="w-full border-2 outline-none border-gray-700 bg-transparent px-4 h-[3rem] font-[700] placeholder:text-red-400 placeholder:font-[400]"
                  onChange={(e) => setTrainTo(e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <input
                  value={date}
                  type="date"
                  name="date"
                  className="w-full border-2 outline-none border-gray-700 bg-transparent px-4 h-[3rem] font-[700] placeholder:text-gray-200 placeholder:font-[400]"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <button
                  type="submit"
                  className="bg-orange-500 px-4 h-[3rem] text-[#fff] w-full font-[500]"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          {/* bg image  */}
          <div className="w-full h-full absolute bg-red-400 top-0">
            <img
              src="./Assets/bg2.jpeg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          {/* Tranis Table  */}
          <div className="mt-5 h-[60vh] w-[95%] sm:w-[80%] mx-auto bg-[#b8d9ff6a] relative z-[999] overflow-y-auto">
            <div class="w-full relative">
              <table class="w-full text-sm text-left text-gray-500 ">
                <thead class="text-xs text-gray-100 uppercase bg-gray-500 ">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Train name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      From
                    </th>
                    <th scope="col" class="px-6 py-3">
                      To
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Distance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trainData?.map((train, i) => {
                    const {
                      from_station_name,
                      to_station_name,
                      train_name,
                      distance,
                      from_sta,
                      to_sta,
                      train_number,
                      run_days,
                    } = train;
                    return (
                      <>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-col gap-2"
                          >
                            <span>
                              {train_name} ({train_number})
                            </span>
                            <span className="flex flex-row items-center">
                              {run_days?.map((day, i) => {
                                return (
                                  <>
                                    <span
                                      key={i}
                                      className="text-gray-400 font-[400]"
                                    >
                                      {day} ,{" "}
                                    </span>
                                  </>
                                );
                              })}
                            </span>
                          </th>
                          <td class="px-6 py-4">
                            {from_station_name}-({from_sta})
                          </td>
                          <td class="px-6 py-4">
                            {to_station_name}-({to_sta})
                          </td>
                          <td class="px-6 py-4">{distance} kms</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
              {isLoading ? (
                <div role="status" className="flex justify-center py-12">
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return design;
};

export default Home;
