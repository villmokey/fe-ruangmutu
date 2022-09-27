import { message, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthToken } from "../../../../../globals/useAuthToken";
import {
  getAllApprovalQualityIndicator,
  qualityIndicatorSelector,
  updateStatusQualityIndicator,
} from "../../../../../redux/modules/qualityIndicator/action";
import { DocumentApprovalCard } from "../../../../molecules/DocumentApprovalCard/DocumentApprovalCard";
import { useNavigate } from "react-router-dom";
import { Text } from "../../../../atoms/Text/Text";

export const PerformanceIndicatorApproval = ({ filter }) => {
  const dispatch = useDispatch();
  const { getAccessToken, getUserId } = useAuthToken();
  const accessToken = getAccessToken();
  const userID = getUserId();
  const navigate = useNavigate();

  const {
    data: { approvalList },
    success: { update: updateStatus },
    loading,
  } = useSelector(qualityIndicatorSelector);

  const [dataSource, setDataSource] = useState(null);

  useEffect(() => {
    dispatch(
      getAllApprovalQualityIndicator(userID, {
        accessToken,
        param: {
          ...filter,
          type: "performance",
        },
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateStatus, filter]);

  useEffect(() => {
    if (!approvalList) return;
    fetchData(approvalList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvalList]);

  useEffect(() => {
    if (!updateStatus) return;
    message.info("Berhasil mengubah status!");
  }, [updateStatus]);

  const fetchData = (data) => {
    const fetch = data.map((item, index) => {
      let approval1 = item.signature.filter((item) => item.level === 1)[0];
      let approval2 = item.signature.filter((item) => item.level === 2)[0];
      let approval3 = item.signature.filter((item) => item.level === 3);

      // -1 Ditolak
      // 0 belum disetujui siapapun
      // 1 sudah disetujui pembuat dokumen
      // 2 sudah disetujui pj 1
      // 3 sudah disetujui pj 2 / finish

      let filterSignature = [];
      if (item.status !== -1) {
        filterSignature = item.signature.filter(
          (item) => item.user_id === userID && item.signed === 1
        );
      }

      let approval3Temp = "";
      if (approval3.length) {
        if (approval3[0].signed === 1) {
          approval3Temp = approval3[0].signed_at;
        } else {
          approval3Temp = "Belum disetujui";
        }
      } else {
        approval3Temp = "Tidak ada penanggung jawab 2";
      }

      return {
        id: item.id,
        userID,
        month: item.month,
        isApproved: filterSignature.length ? true : false,
        title: item.profile_indicator.title,
        createdBy: item.created_by,
        createdAt: new Date(item.created_at).toLocaleDateString(),
        approval1:
          approval1.signed === 1
            ? new Date(approval1.signed_at).toLocaleDateString()
            : "Belum disetujui",
        approval2:
          approval2.signed === 1
            ? new Date(approval2.signed_at).toLocaleDateString()
            : "Belum disetujui",
        approval3: approval3Temp,
        status: item.status,
        signature: item.signature,
      };
    });

    setDataSource(fetch);
  };

  const handleReject = async (id) => {
    await dispatch(
      updateStatusQualityIndicator(id, {
        accessToken,
        param: {
          user_id: userID,
          status: "rejected",
        },
      })
    );

    navigate(-1);
    message.info("Berhasil mengubah status!");
  };

  const handleApprove = async (id) => {
    await dispatch(
      updateStatusQualityIndicator(id, {
        accessToken,
        param: {
          user_id: userID,
        },
      })
    );

    navigate(-1);
    message.info("Berhasil mengubah status!");
  };

  return !loading ? (
    <>
      {dataSource && dataSource.length > 0 ? (
        dataSource.map((item, index) => (
          <DocumentApprovalCard
            key={index}
            month={item.month}
            documentApprovalTitle={item.title}
            documentApprovalCreatedAt={item.createdAt}
            documentApproval1Date={item.approval1}
            documentApproval2Date={item.approval2}
            documentApproval3Date={item.approval3}
            createdBy={item.createdBy}
            isApproved={item.isApproved}
            signature={item.signature}
            indicatorID={item.id}
            type={"indicator"}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))
      ) : (
        <div style={{ width: "100%", textAlign: "center", margin: "50px 0" }}>
          <Text>
            <strong>Oops, </strong>Belum ada data
          </Text>
        </div>
      )}
    </>
  ) : (
    <Skeleton />
  );
};
