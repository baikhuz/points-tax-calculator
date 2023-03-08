import { TaxInfoType } from "../types";

export interface TaxInfoProps {
  taxInfo: TaxInfoType;
}

const TaxInfo = ({ taxInfo }: TaxInfoProps) => {
  return taxInfo.effectiveTaxRate !== 0 ? (
    <>
      {Object.keys(taxInfo).length !== 0 ? (
        <ul>
          <li>Tax Rate: {taxInfo.taxRate * 100}%</li>
          <li>
            Tax Owed:{" "}
            {taxInfo.taxOwed.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </li>
          <li>
            Tax Per Band:
            {taxInfo.taxPerBand.map((band) => {
              return (
                <div key={band.rate}>
                  {(Number(band.rate) * 100).toFixed(2)}%:{" "}
                  {band.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
              );
            })}
          </li>
          <li>
            Effective Tax Rate:{" "}
            {Number(taxInfo.effectiveTaxRate.toFixed(2)) * 100}%
          </li>
        </ul>
      ) : null}
    </>
  ) : null;
};

export default TaxInfo;
