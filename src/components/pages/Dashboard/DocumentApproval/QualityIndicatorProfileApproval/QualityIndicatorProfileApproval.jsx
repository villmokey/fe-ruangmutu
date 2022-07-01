import { useAuthToken } from "../../../../../globals/useAuthToken";
import { DocumentApprovalCard } from "../../../../molecules/DocumentApprovalCard/DocumentApprovalCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllApprovalProfileQualityIndicator, profileQualityIndicatorSelector, updateStatusProfileQualityIndicator } from "../../../../../redux/modules/profileQualityIndicator/action";
import { message } from "antd";

export const QualityIndicatorProfileApproval = () => {
  const dispatch = useDispatch();
  const { getAccessToken, getUserId } = useAuthToken();
  const accessToken = getAccessToken();
  const userID = getUserId();

  const {
    data: {
      approvalList
    },
    success: {
      update
    }
  } = useSelector(profileQualityIndicatorSelector)

  const [ dataSource, setDataSource ] = useState(null);

  useEffect(() => {
    dispatch(getAllApprovalProfileQualityIndicator(userID, {
      accessToken
    }))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[update])

  useEffect(() => {
    if (!approvalList) return;
    fetchData(approvalList)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvalList])

  useEffect(() => {
    console.log(update);
    if (!update) return;
    message.info('Berhasil mengubah status!');
  }, [update])

  const fetchData = (data) => {
    console.log(data);
    const fetch = data.map((item, index) => {
      

      let approval1 = item.signature.filter(item => item.level === 1)[0]
      let approval2 = item.signature.filter(item => item.level === 2)[0]
      let approval3 = item.signature.filter(item => item.level === 3)

      // -1 Ditolak
      // 0 belum disetujui siapapun
      // 1 sudah disetujui pembuat dokumen
      // 2 sudah disetujui pj 1
      // 3 sudah disetujui pj 2 / finish

      let filterSignature = []
      if (item.status !== -1) {
        filterSignature = item.signature.filter(item => item.user_id === userID && item.signed === 1)
      }

      return {
        id: item.id,
        userID,
        isApproved: filterSignature.length ? true : false,
        title: item.title,
        createdBy: item.created_by,
        createdAt: new Date(item.created_at).toLocaleDateString(),
        approval1: approval1.user.signed === 1 ? new Date().toLocaleDateString() : 'Belum disetujui',
        approval2: approval2.user.signed === 1 ? new Date().toLocaleDateString() : 'Belum disetujui',
        approval3: approval3.length ? approval2.user.signed === 1 ? new Date().toLocaleDateString() : 'Belum disetujui' : '-',
        status: item.status
      }
    })

    console.log(fetch);

    setDataSource(fetch);
  }

  const handleReject = async (id) => {
    await dispatch(updateStatusProfileQualityIndicator(id, {
      accessToken,
      param: {
        user_id: userID,
        status: 'rejected'
      }
    }))
  }

  const handleApprove = async (id) => {
    await dispatch(updateStatusProfileQualityIndicator(id, {
      accessToken,
      param: {
        user_id: userID
      }
    }))
  }

  return (
    <>
      {
        dataSource &&
        dataSource.map((item, index) => (
          <DocumentApprovalCard
            key={index}
            documentApprovalTitle={item.title}
            documentApprovalCreatedAt={item.createdAt}
            documentApproval1Date={item.approval1}
            documentApproval2Date={item.approval2}
            documentApproval3Date={item.approval3}
            createdBy={item.createdBy}
            isApproved={item.isApproved}
            indicatorID={item.id}
            onApprove={handleApprove}
            onReject={handleReject}
            status={item.status}
          />
        ))
      }
    </>
  )
}