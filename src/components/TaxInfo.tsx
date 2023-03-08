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
            {taxInfo.taxPerBand.map((band) => (
              <div key={band.rate}>
                {Number(band.rate.toFixed(2)) * 100}%:{" "}
                {band.amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
            ))}
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
