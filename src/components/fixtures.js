import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import Button from "./button";
import Container from "./container";
import GuessScoreModal from "./modals/guess-score-modal";

export default function Fixtures(params) {
  const predictions = useSelector((state) => state.match.predictions);
  console.log({ predictions });
  const [selectedPrediction, setSelectedPrediction] = React.useState(null);

  return (
    <Container className="mt-16">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        This Week Fixtures
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        {_.map(predictions, (prediction, index) => (
          <div key={prediction._id} className="group relative">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-md overflow-hidden">
              <div className="relative px-6 py-5 flex items-center space-x-3 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={prediction.match.homeLogo}
                    alt=""
                  />
                </div>
                <div className="flex-1 min-w-0">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">
                    {prediction.match.homeName}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {prediction.homeScore}
                </div>
              </div>
              <div className="relative px-6 py-5 flex items-center space-x-3  focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={prediction.match.awayLogo}
                    alt=""
                  />
                </div>
                <div className="flex-1 min-w-0">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">
                    {prediction.match.awayName}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {prediction.awayScore}
                </div>
              </div>
              <div className="mt-2">
                <Button
                  className="w-full bg-pink-600 border border-transparent py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-pink-700"
                  onClick={() => setSelectedPrediction(prediction)}
                  disabled={prediction?.match.result !== "notStart"}
                >
                  {prediction?.match.result === "notStart"
                    ? "Guess Score"
                    : prediction?.match.result === "started"
                    ? "Match Started"
                    : "Match Played"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedPrediction && (
        <GuessScoreModal
          prediction={selectedPrediction}
          setPrediction={setSelectedPrediction}
        />
      )}
    </Container>
  );
}
