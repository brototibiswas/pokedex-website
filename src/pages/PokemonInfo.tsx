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
                <div className="card-header">
                  <p>Abilities</p>
                </div>

                <div className="card-content container-flex-row"></div>
              </div>
            </TableCard>
          </section>

          <section className="section-right">
            <TableCard>
              <div className="table-card">
                <div className="card-header">
                  <p>Basic Stats</p>
                </div>

                <div className="card-content container-flex-row">
                  <div className="table-row table-header">
                    <p className="row-item">Height</p>
                    <p className="row-item">Weight</p>
                  </div>
                  <div className="table-row table-content">
                    <p className="row-item">{pokemonDetail?.height}</p>
                    <p className="row-item">{pokemonDetail?.weight}</p>
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
