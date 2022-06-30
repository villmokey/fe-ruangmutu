import { DocumentApprovalCard } from "../../../../molecules/DocumentApprovalCard/DocumentApprovalCard"

export const QualityIndicatorApproval = () => {
  return (
    <>
      <DocumentApprovalCard 
        documentApprovalTitle="Butuh Judul"
        documentApprovalCreatedAt="20/06/2020"
        documentApprovalDate="25/06/2020"
        createdBy="Budi"
      />
      <DocumentApprovalCard 
        documentApprovalTitle="Butuh Judul"
        documentApprovalCreatedAt="20/06/2020"
        documentApprovalDate="25/06/2020"
        createdBy="Budi"
        isApproved={true}
      />
      <DocumentApprovalCard 
        documentApprovalTitle="Butuh Judul"
        documentApprovalCreatedAt="20/06/2020"
        documentApprovalDate="25/06/2020"
        createdBy="Budi"
      />
    </>
  )
}