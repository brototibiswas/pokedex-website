import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./commonPage.css";
import "./styles/pokemonInfo.css";
import PokemonDetailHeader from "../component/PokemonDetailHeader/PokemonDetailHeader";
import { useEffect, useState } from "react";
import { PokemonColor, getPokemonColorHex } from "../models/ColorEnum";
import { PokemonGeneralApi } from "../network/PokemonGeneralApi";
import { PokemonSpeciesApi } from "../network/PokemonSpeciesApi";
import TableCard from "../component/TableCard/TableCard";

const PokemonInfo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [pokemonDetail, setPokemonDetail] = useState<PokemonGeneralApi.Model>();
  const [speciesData, setSpeciesData] = useState<PokemonSpeciesApi.Model>();

  const { id } = useParams();
  const numericID = Number(id);

  useEffect(() => {
    // If id is not number, return to previous state or homepage
    if (isNaN(numericID)) {
      navigate(state?.from || "/");
    }
  });

  useEffect(() => {
    PokemonGeneralApi.getDataByID(numericID).then((data) => {
      setPokemonDetail(data);
    });
    PokemonSpeciesApi.getSpeciesDataByID(numericID).then((data) => {
      console.log(data);
      setSpeciesData(data);
    });
  }, [numericID]);

  return (
    <>
      <PokemonDetailHeader
        name={pokemonDetail?.name || ""}
        color={getPokemonColorHex(speciesData?.color || PokemonColor.Gray)}
        imageURL={pokemonDetail?.imageURL || ""}
        types={pokemonDetail?.types || []}
      />

      <div className="main-container container-flex-col">
        <div className="content-container">
          <section className="section-left">
            <div className="description-container">
              <p>{speciesData?.description}</p>
            </div>

            <TableCard>
              <div className="table-card">
                <p className="card-header">Abilities</p>
              </div>
            </TableCard>
          </section>

          <section className="section-right">
            <TableCard>
              <div className="table-card">
                <p className="card-header">Basic Stats</p>
                <div className="table-container container-flex-row">
                  <div className="table-card-header">
                    <p>Height</p>
                    <p>Weight</p>
                  </div>
                  <div className="table-card-description">
                    <p>{pokemonDetail?.height}</p>
                    <p>{pokemonDetail?.weight}</p>
                  </div>
                </div>
              </div>
            </TableCard>
          </section>
        </div>
      </div>
    </>
  );
};

export default PokemonInfo;
