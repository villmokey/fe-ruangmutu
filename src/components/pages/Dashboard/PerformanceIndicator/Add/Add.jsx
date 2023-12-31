import { Button, Col, Layout, message, Row, Steps } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FirstStep } from "../../../../templates/PerformanceIndicatorTemplates/Add/FirstStep";
import { SecondStep as ProfilePerformanceIndicatorSecondStep } from "../../../../templates/PerformanceIndicatorTemplates/Add/ProfilePerformanceIndicator/SecondStep";
import { ThirdStep as ProfileQualityIndicatorThirdStep } from "../../../../templates/PerformanceIndicatorTemplates/Add/ProfilePerformanceIndicator/ThirdStep";
import { SecondStep as PerformanceIndicatorSecondStep } from "../../../../templates/PerformanceIndicatorTemplates/Add/PerformanceIndicator/SecondStep";
import { ThirdStep as PerformanceIndicatorThirdStep } from "../../../../templates/PerformanceIndicatorTemplates/Add/PerformanceIndicator/ThirdStep";
import { Form } from "antd";
import { Title } from "../../../../atoms/Title/Title";
import { Text } from "../../../../atoms/Text/Text";
import { Card } from "../../../../atoms/Card/Card";
import { useDispatch, useSelector } from "react-redux";

import "./Add.less";
import {
  getAllProgram,
  programSelector,
} from "../../../../../redux/modules/program/action";
import { useAuthToken } from "../../../../../globals/useAuthToken";
import {
  getAllUser,
  userSelector,
} from "../../../../../redux/modules/user/action";
import {
  getAllProfileQualityIndicator,
  profileQualityIndicatorSelector,
  uploadFileAPIProfileQualityIndicator,
} from "../../../../../redux/modules/profileQualityIndicator/action";
import {
  qualityIndicatorSelector,
  uploadFileAPIQualityIndicator,
} from "../../../../../redux/modules/qualityIndicator/action";
// import { fileSelector } from '../../../../../redux/modules/file/action';
import moment from "moment";
import { fetchApiPost } from "../../../../../globals/fetchApi";

const { Sider, Content } = Layout;
const { Step } = Steps;

export const Add = () => {
  const {
    // called: programCalled,
    data: { list: programList },
  } = useSelector(programSelector);

  const {
    // called: calledUser,
    data: { list: userList },
  } = useSelector(userSelector);

  const {
    data: { upload, list: profileList },
  } = useSelector(profileQualityIndicatorSelector);

  const {
    data: { upload: uploadQualityIndicator },
  } = useSelector(qualityIndicatorSelector);

  const dispatch = useDispatch();
  const { getAccessToken, getName, getUserId } = useAuthToken();
  const accessToken = getAccessToken();
  const navigate = useNavigate();
  const [createLoading, setCreateLoading] = useState(false);

  const [secondStepProfileQualityIndicatorForm] = Form.useForm();
  const [thirdStepProfileQualityIndicatorForm] = Form.useForm();

  const [secondStepQualityIndicatorForm] = Form.useForm();
  const [thirdStepQualityIndicatorForm] = Form.useForm();

  const [current, setCurrent] = useState(0);
  const [documentFormChoosen, setDocumentFormChoosen] = useState(0);

  const [programMutuOptions, setProgramMutuOptions] = useState(null);
  const [subProgramMutuOptions, setSubProgramMutuOptions] = useState(null);

  const [profileQualityIndicatorDataTemp, setProfileQualityIndicatorDataTemp] =
    useState(null);
  const [qualityIndicatorDataTemp, setQualityIndicatorDataTemp] =
    useState(null);
    const [usersMasterOptions, setUsersMasterOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [userOptions2, setUserOptions2] = useState([]);
  const [userOptions3, setUserOptions3] = useState([]);
  const [profileQualityOptions, setProfileQualityOptions] = useState(null);

  const [
    qualityProfileIndicatorIsUploading,
    setProfileQualityIndicatorIsUploading,
  ] = useState(false);
  const [qualityIndicatorIsUploading, setQualityIndicatorIsUploading] =
    useState(false);

  useEffect(() => {
    dispatch(getAllProgram());
    dispatch(getAllUser());
    dispatch(getAllProfileQualityIndicator({ param: { type: "performance" } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!programList) return;
    const fetch = programList.map((item, index) => {
      return {
        ...item,
        key: item.id,
        title: item.name,
        value: item.name,
      };
    });

    setProgramMutuOptions(fetch);
  }, [programList]);

  useEffect(() => {
    if (!profileList) return;
    const fetch = profileList.map((item, index) => {
      return {
        ...item,
        key: item.id,
      };
    });

    const filter = fetch.filter((item) => item.status === 3);

    setProfileQualityOptions(filter);
  }, [profileList]);

  useEffect(() => {
    if (!userList) return;

    secondStepProfileQualityIndicatorForm.setFieldsValue({
      dibuatOleh: getName(),
      pembuatDokumen: getUserId(),
    });

    secondStepQualityIndicatorForm.setFieldsValue({
      dibuatOleh: getName(),
      pembuatDokumen: getUserId(),
    });

    const fetch = userList.map((item, index) => {
      return {
        ...item,
        key: item.id,
        value: item.id,
        name: item.name,
      };
    });

    setUsersMasterOptions(fetch);
    setUserOptions(fetch);
    setUserOptions2(fetch);
    setUserOptions3(fetch);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userList]);

  useEffect(() => {
    if (!qualityProfileIndicatorIsUploading) return;

    if (
      profileQualityIndicatorDataTemp.dokumenTelusur &&
      profileQualityIndicatorDataTemp.dokumenTelusur.length > 0 &&
      !upload
    )
      return;

    let quality_dimension = profileQualityIndicatorDataTemp.dimensiMutu.map(
      (item) => {
        return {
          name: item,
        };
      }
    );

    let indicator_type = profileQualityIndicatorDataTemp.tipeIndikator.map(
      (item) => {
        return {
          name: item,
        };
      }
    );

    let data_collection_frequency =
      profileQualityIndicatorDataTemp.frekuensiPengumpulanData.map((item) => {
        return {
          name: item,
        };
      });

    let data_collection_period =
      profileQualityIndicatorDataTemp.periodeWaktuPelaporan.map((item) => {
        return {
          name: item,
        };
      });

    let data_analyst_period =
      profileQualityIndicatorDataTemp.periodeAnalisis.map((item) => {
        return {
          name: item,
        };
      });

    let signature = [];

    signature.push({
      user_id: profileQualityIndicatorDataTemp.pembuatDokumen,
      level: 1,
    });

    signature.push({
      user_id: profileQualityIndicatorDataTemp.penanggungJawab1,
      level: 2,
    });

    if (
      profileQualityIndicatorDataTemp.penanggungJawab2 !== null &&
      profileQualityIndicatorDataTemp.penanggungJawab2 !== undefined
    ) {
      signature.push({
        user_id: profileQualityIndicatorDataTemp.penanggungJawab2,
        level: 3,
      });
    }

    let finalData = {
      program_id: profileQualityIndicatorDataTemp.programMutu,
      sub_program_id: profileQualityIndicatorDataTemp.subProgramMutu,
      title: profileQualityIndicatorDataTemp.judulIndikator,
      indicator_selection_based:
        profileQualityIndicatorDataTemp.dasarPemilihanIndikator,
      quality_dimension,
      objective: profileQualityIndicatorDataTemp.tujuan,
      operational_definition:
        profileQualityIndicatorDataTemp.definisiOperasional,
      indicator_type,
      measurement_status: profileQualityIndicatorDataTemp.statusPengukuran,
      numerator: profileQualityIndicatorDataTemp.numerator,
      denominator: profileQualityIndicatorDataTemp.denominator,
      achievement_target: profileQualityIndicatorDataTemp.achievement_target,
      criteria: profileQualityIndicatorDataTemp.kriteriaInklusiEkslusi,
      measurement_formula: profileQualityIndicatorDataTemp.formulaPengukuran,
      data_collection_design: profileQualityIndicatorDataTemp.pengumpulanData,
      data_source: profileQualityIndicatorDataTemp.sumberData,
      population: profileQualityIndicatorDataTemp.populasiAtauSampel,
      data_collection_frequency,
      data_collection_period,
      data_analyst_period,
      data_presentation: profileQualityIndicatorDataTemp.penyajianData,
      created_by: getName(),
      first_pic_id: profileQualityIndicatorDataTemp.penanggungJawab1,
      second_pic_id: profileQualityIndicatorDataTemp.penanggungJawab2,
      assign_by: profileQualityIndicatorDataTemp.pembuatDokumen,
      signature,
      document_id:
        profileQualityIndicatorDataTemp.dokumenTelusur &&
        profileQualityIndicatorDataTemp.dokumenTelusur.length > 0
          ? upload?.data?.id ?? ""
          : "",
      type: "performance",
    };

    setCreateLoading(true);
    fetchApiPost("/indicator-profile", accessToken, finalData)
      .then((res) => {
        if (res && res.success) {
          message.success("Berhasil membuat profile indikator kinerja");
          navigate("/dashboard/performance-indicator/");
        } else {
          if (res && res.response && res.response.data)
            message.error(res.response.data.message);
        }
      })
      .catch()
      .finally(() => setCreateLoading(false));

    setProfileQualityIndicatorIsUploading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualityProfileIndicatorIsUploading, upload]);

  useEffect(() => {
    if (!qualityIndicatorIsUploading) return;

    if (
      qualityIndicatorDataTemp.dokumenTelusur &&
      qualityIndicatorDataTemp.dokumenTelusur.length > 0 &&
      !uploadQualityIndicator
    )
      return;

    let signature = [];

    signature.push({
      user_id: qualityIndicatorDataTemp.pembuatDokumen,
      level: 1,
    });

    signature.push({
      user_id: qualityIndicatorDataTemp.penanggungJawab1,
      level: 2,
    });

    if (
      qualityIndicatorDataTemp.penanggungJawab2 !== null &&
      qualityIndicatorDataTemp.penanggungJawab2 !== undefined
    ) {
      signature.push({
        user_id: qualityIndicatorDataTemp.penanggungJawab2,
        level: 3,
      });
    }

    let finalData = {
      title: qualityIndicatorDataTemp.judulIndikator,
      program_id: qualityIndicatorDataTemp.programMutu,
      sub_program_id: qualityIndicatorDataTemp.subProgramMutu,
      month: qualityIndicatorDataTemp.bulan,
      quality_goal: qualityIndicatorDataTemp.sasaranMutu,
      human: qualityIndicatorDataTemp.manusia,
      tools: qualityIndicatorDataTemp.alat,
      method: qualityIndicatorDataTemp.metode,
      policy: qualityIndicatorDataTemp.kebijakan,
      environment: qualityIndicatorDataTemp.lingkungan,
      next_plan: qualityIndicatorDataTemp.rencanaTindakLanjut,
      created_by: getName(),
      first_pic_id: qualityIndicatorDataTemp.penanggungJawab1,
      second_pic_id: qualityIndicatorDataTemp.penanggungJawab2,
      assign_by: qualityIndicatorDataTemp.pembuatDokumen,
      signature,
      document_id:
        qualityIndicatorDataTemp.dokumenTelusur &&
        qualityIndicatorDataTemp.dokumenTelusur.length > 0
          ? uploadQualityIndicator?.data?.id ?? ""
          : "",
      month_target: qualityIndicatorDataTemp.capaianBulanIni,
      type: "performance",
    };

    setCreateLoading(true);
    fetchApiPost("/indicator", accessToken, finalData)
      .then((res) => {
        if (res && res.success) {
          message.success("Berhasil menambahkan indikator kinerja");
          navigate("/dashboard/performance-indicator/");
        } else {
          if (res && res.response && res.response.data)
            message.error(res.response.data.message);
        }
      })
      .catch()
      .finally(() => setCreateLoading(false));

    setQualityIndicatorIsUploading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualityIndicatorIsUploading, uploadQualityIndicator]);

  const handleChangeProgramMutu = (value) => {
    // if (!programMutuOptions) return;
    // const filter = programMutuOptions.filter((item) => item.id === value);
    // if (filter[0].sub_programs.length) {
    //   const fetchSubProgram = filter[0].sub_programs.map((item, index) => {
    //     return {
    //       ...item,
    //       key: item.id,
    //       value: item.id,
    //       title: item.name,
    //     };
    //   });
    //   setSubProgramMutuOptions(fetchSubProgram);
    // } else {
    //   message.warning("Sub Program Mutu tidak tersedia!");
    //   setSubProgramMutuOptions(undefined);
    // }
  };

  const handleChangeJudulIndikator = (value) => {
    const filter = profileQualityOptions.filter((item) => item.id === value);
    if (filter.length) {
      const filterProgramMutu = programMutuOptions.filter(
        (item) => item.id === filter[0].program_id
      );

      if (filterProgramMutu.length) {
        const fetchSubProgram = filterProgramMutu[0].sub_programs.map(
          (item, index) => {
            return {
              ...item,
              key: item.id,
              value: item.id,
              title: item.name,
            };
          }
        );

        setSubProgramMutuOptions(fetchSubProgram);

        secondStepQualityIndicatorForm.setFieldsValue({
          programMutu: filter[0].program_id,
          subProgramMutu: filter[0].sub_program_id,
        });
      }
    }
  };

  const handleStepThreeProfileQualityIndicator = (value) => {
    thirdStepProfileQualityIndicatorForm.setFieldsValue({
      programMutu: value.programMutu,
      subProgramMutu: value.subProgramMutu,
      judulIndikator: value.judulIndikator,
      dasarPemilihanIndikator: value.dasarPemilihanIndikator,
      dimensiMutu: value.dimensiMutu,
      tujuan: value.tujuan,
      definisiOperasional: value.definisiOperasional,
      tipeIndikator: value.tipeIndikator,
      statusPengukuran: value.statusPengukuran,
      numerator: value.numerator,
      denominator: value.denominator,
      achievement_target: value.achievement_target,
      kriteriaInklusiEkslusi: value.kriteriaInklusiEkslusi,
      formulaPengukuran: value.formulaPengukuran,
      pengumpulanData: value.pengumpulanData,
      sumberData: value.sumberData,
      populasiAtauSampel: value.populasiAtauSampel,
      frekuensiPengumpulanData: value.frekuensiPengumpulanData,
      periodeWaktuPelaporan: value.periodeWaktuPelaporan,
      periodeAnalisis: value.periodeAnalisis,
      penyajianData: value.penyajianData,
      dibuatOleh: value.dibuatOleh,
      pembuatDokumen: value.pembuatDokumen,
      penanggungJawab1: value.penanggungJawab1,
      penanggungJawab2: value.penanggungJawab2,
      dokumenTelusur: value.dokumenTelusur?.fileList ?? [],
    });
  };

  const handleStepThreeQualityIndicator = (value) => {
    thirdStepQualityIndicatorForm.setFieldsValue({
      judulIndikator: value.judulIndikator,
      programMutu: value.programMutu,
      subProgramMutu: value.subProgramMutu,
      manusia: value.manusia,
      alat: value.alat,
      metode: value.metode,
      bulan: value.bulan,
      sasaranMutu: value.sasaranMutu,
      kebijakan: value.kebijakan,
      lingkungan: value.lingkungan,
      rencanaTindakLanjut: value.rencanaTindakLanjut,
      dokumenTelusur: value.dokumenTelusur?.fileList ?? [],
      dibuatOleh: value.dibuatOleh,
      pembuatDokumen: value.pembuatDokumen,
      penanggungJawab1: value.penanggungJawab1,
      penanggungJawab2: value.penanggungJawab2,
      capaianBulanIni: value.capaianBulanIni,
    });
  };

  const next = () => {
    if (documentFormChoosen === 1) {
      if (current === 1) {
        secondStepProfileQualityIndicatorForm.submit();
      }

      setCurrent(current + 1);
    } else if (documentFormChoosen === 2) {
      if (current === 1) {
        secondStepQualityIndicatorForm.submit();
      }

      setCurrent(current + 1);
    }
  };

  const prev = () => {
    if (documentFormChoosen === 1) {
      if (current === 1) {
        secondStepProfileQualityIndicatorForm.submit();
      }

      if (current === 2) {
        setUserOptions(usersMasterOptions);
        setUserOptions2(usersMasterOptions);
        setUserOptions3(usersMasterOptions);
      }

      setCurrent(current - 1);
    } else if (documentFormChoosen === 2) {
      if (current === 1) {
        secondStepQualityIndicatorForm.submit();
      }

      if (current === 2) {
        setUserOptions(usersMasterOptions);
        setUserOptions2(usersMasterOptions);
        setUserOptions3(usersMasterOptions);
      }

      setCurrent(current - 1);
    }
  };

  const handleChangeDocumentForm = (e) => {
    setDocumentFormChoosen(e.target.value);
  };

  const pembuatDokumenChange = (v) => {
    console.log("pembuatDokumenChange");
    if (documentFormChoosen === 1) {
      let lists = [
        v,
        secondStepProfileQualityIndicatorForm.getFieldValue("penanggungJawab1"),
        secondStepProfileQualityIndicatorForm.getFieldValue("penanggungJawab2"),
      ];

      if (
        secondStepProfileQualityIndicatorForm.getFieldValue(
          "penanggungJawab1"
        ) === v
      ) {
        secondStepProfileQualityIndicatorForm.setFieldsValue({
          penanggungJawab1: undefined,
        });
      }

      if (
        secondStepProfileQualityIndicatorForm.getFieldValue(
          "penanggungJawab2"
        ) === v
      ) {
        secondStepProfileQualityIndicatorForm.setFieldsValue({
          penanggungJawab2: undefined,
        });
      }

      let temp = usersMasterOptions.filter((x) => !lists.includes(x.value));
      setUserOptions2(temp);
      setUserOptions3(temp);
    } else if (documentFormChoosen === 2) {
      let lists = [
        v,
        secondStepQualityIndicatorForm.getFieldValue("penanggungJawab1"),
        secondStepQualityIndicatorForm.getFieldValue("penanggungJawab2"),
      ];

      if (
        secondStepQualityIndicatorForm.getFieldValue("penanggungJawab1") === v
      ) {
        secondStepQualityIndicatorForm.setFieldsValue({
          penanggungJawab1: undefined,
        });
      }

      if (
        secondStepQualityIndicatorForm.getFieldValue("penanggungJawab2") === v
      ) {
        secondStepQualityIndicatorForm.setFieldsValue({
          penanggungJawab2: undefined,
        });
      }

      let temp = usersMasterOptions.filter((x) => !lists.includes(x.value));
      setUserOptions2(temp);
      setUserOptions3(temp);
    }
  };

  const penanggungJawab1Change = (v) => {
    console.log("penanggungJawab1Change");
    if (documentFormChoosen === 1) {
      let lists = [
        secondStepProfileQualityIndicatorForm.getFieldValue("pembuatDokumen"),
        v,
        secondStepProfileQualityIndicatorForm.getFieldValue("penanggungJawab2"),
      ];

      if (
        secondStepProfileQualityIndicatorForm.getFieldValue(
          "pembuatDokumen"
        ) === v
      ) {
        secondStepProfileQualityIndicatorForm.setFieldsValue({
          pembuatDokumen: undefined,
        });
      }

      if (
        secondStepProfileQualityIndicatorForm.getFieldValue(
          "penanggungJawab2"
        ) === v
      ) {
        secondStepProfileQualityIndicatorForm.setFieldsValue({
          penanggungJawab2: undefined,
        });
      }

      let temp = usersMasterOptions.filter((x) => !lists.includes(x.value));
      setUserOptions(temp);
      setUserOptions3(temp);
    } else if (documentFormChoosen === 2) {
      let lists = [
        secondStepQualityIndicatorForm.getFieldValue("pembuatDokumen"),
        v,
        secondStepQualityIndicatorForm.getFieldValue("penanggungJawab2"),
      ];

      if (
        secondStepQualityIndicatorForm.getFieldValue("pembuatDokumen") === v
      ) {
        secondStepQualityIndicatorForm.setFieldsValue({
          pembuatDokumen: undefined,
        });
      }

      if (
        secondStepQualityIndicatorForm.getFieldValue("penanggungJawab2") === v
      ) {
        secondStepQualityIndicatorForm.setFieldsValue({
          penanggungJawab2: undefined,
        });
      }

      let temp = usersMasterOptions.filter((x) => !lists.includes(x.value));
      setUserOptions(temp);
      setUserOptions3(temp);
    }
  };

  const penanggungJawab2Change = (v) => {
    console.log("penanggungJawab2Change");
    if (documentFormChoosen === 1) {
      let lists = [
        secondStepProfileQualityIndicatorForm.getFieldValue("pembuatDokumen"),
        secondStepProfileQualityIndicatorForm.getFieldValue("penanggungJawab1"),
        v,
      ];

      if (
        secondStepProfileQualityIndicatorForm.getFieldValue(
          "pembuatDokumen"
        ) === v
      ) {
        secondStepProfileQualityIndicatorForm.setFieldsValue({
          pembuatDokumen: undefined,
        });
      }

      if (
        secondStepProfileQualityIndicatorForm.getFieldValue(
          "penanggungJawab1"
        ) === v
      ) {
        secondStepProfileQualityIndicatorForm.setFieldsValue({
          penanggungJawab2: undefined,
        });
      }

      let temp = usersMasterOptions.filter((x) => !lists.includes(x.value));
      setUserOptions(temp);
      setUserOptions2(temp);
    } else if (documentFormChoosen === 2) {
      let lists = [
        secondStepQualityIndicatorForm.getFieldValue("pembuatDokumen"),
        secondStepQualityIndicatorForm.getFieldValue("penanggungJawab1"),
        v,
      ];

      if (
        secondStepQualityIndicatorForm.getFieldValue("pembuatDokumen") === v
      ) {
        secondStepQualityIndicatorForm.setFieldsValue({
          pembuatDokumen: undefined,
        });
      }

      if (
        secondStepQualityIndicatorForm.getFieldValue("penanggungJawab1") === v
      ) {
        secondStepQualityIndicatorForm.setFieldsValue({
          penanggungJawab2: undefined,
        });
      }

      let temp = usersMasterOptions.filter((x) => !lists.includes(x.value));
      setUserOptions(temp);
      setUserOptions2(temp);
    }
  };

  const handleSubmitFormProfileQualityIndicator = async (value) => {
    setCreateLoading(true);
    if (value.dokumenTelusur && value.dokumenTelusur.length > 0) {
      const formData = new FormData();
      formData.append("file", value.dokumenTelusur[0].originFileObj);
      formData.append("group_name", "document_profile_indicator_performance");

      dispatch(
        await uploadFileAPIProfileQualityIndicator({
          accessToken,
          param: formData,
        })
      );
    }
    setProfileQualityIndicatorDataTemp(value);
    setProfileQualityIndicatorIsUploading(true);
  };

  const handleSubmitFormQualityIndicator = async (value) => {
    setCreateLoading(true);
    if (value.dokumenTelusur && value.dokumenTelusur.length > 0) {
      const formData = new FormData();
      formData.append("file", value.dokumenTelusur[0].originFileObj);
      formData.append("group_name", "document_quality_indicator");

      dispatch(
        await uploadFileAPIQualityIndicator({
          accessToken,
          param: formData,
        })
      );
    }

    setQualityIndicatorDataTemp(value);
    setQualityIndicatorIsUploading(true);
  };

  const handleSave = () => {
    if (documentFormChoosen === 1) {
      thirdStepProfileQualityIndicatorForm.submit();
    } else if (documentFormChoosen === 2) {
      thirdStepQualityIndicatorForm.submit();
    }
  };

  const steps = [
    {
      title: "Tahap 1",
      content: <FirstStep onChangeForm={handleChangeDocumentForm} />,
    },
    {
      title: "Tahap 2",
      content:
        documentFormChoosen === 1 ? (
          <ProfilePerformanceIndicatorSecondStep
            onFinish={handleStepThreeProfileQualityIndicator}
            form={secondStepProfileQualityIndicatorForm}
            programMutuOptions={programMutuOptions}
            subProgramMutuOptions={subProgramMutuOptions}
            programMutuChange={handleChangeProgramMutu}
            userOptions={userOptions}
            userOptions2={userOptions2}
            userOptions3={userOptions3}
            pembuatDokumenChange={pembuatDokumenChange}
            penanggungJawab1Change={penanggungJawab1Change}
            penanggungJawab2Change={penanggungJawab2Change}
          />
        ) : (
          <PerformanceIndicatorSecondStep
            onFinish={handleStepThreeQualityIndicator}
            judulIndikatorChange={handleChangeJudulIndikator}
            form={secondStepQualityIndicatorForm}
            profileOptions={profileQualityOptions}
            programMutuOptions={programMutuOptions}
            subProgramMutuOptions={subProgramMutuOptions}
            userOptions={userOptions}
            userOptions2={userOptions2}
            userOptions3={userOptions3}
            pembuatDokumenChange={pembuatDokumenChange}
            penanggungJawab1Change={penanggungJawab1Change}
            penanggungJawab2Change={penanggungJawab2Change}
          />
        ),
    },
    {
      title: "Tahap 3",
      content:
        documentFormChoosen === 1 ? (
          <ProfileQualityIndicatorThirdStep
            form={thirdStepProfileQualityIndicatorForm}
            programMutuOptions={programMutuOptions}
            subProgramMutuOptions={subProgramMutuOptions}
            onFinish={handleSubmitFormProfileQualityIndicator}
            userOptions={usersMasterOptions}
            userOptions2={usersMasterOptions}
            userOptions3={usersMasterOptions}
          />
        ) : (
          <PerformanceIndicatorThirdStep
            form={thirdStepQualityIndicatorForm}
            profileOptions={profileQualityOptions}
            programMutuOptions={programMutuOptions}
            subProgramMutuOptions={subProgramMutuOptions}
            onFinish={handleSubmitFormQualityIndicator}
            userOptions={usersMasterOptions}
            userOptions2={usersMasterOptions}
            userOptions3={usersMasterOptions}
          />
        ),
    },
  ];

  return (
    <Layout>
      <Sider className="sider">
        <div className="sider-content">
          <Title level={2}>INDIKATOR KINERJA</Title>
          <Text>{moment().format("dddd, DD MMMM YYYY")}</Text>
        </div>
      </Sider>
      <Content className="main-content">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <Card style={{ margin: "30px 0px 10px" }}>
          {steps[current].content}
        </Card>
        <Row>
          <Col style={{ marginRight: "auto" }}>
            {current > 0 && <Button onClick={() => prev()}>Sebelumnya</Button>}
          </Col>
          <Col style={{ marginLeft: "auto" }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Selanjutnya
              </Button>
            )}
          </Col>
          <Col>
            {current === steps.length - 1 && (
              <Button
                loading={createLoading}
                type="primary"
                onClick={() => handleSave()}
              >
                Simpan
              </Button>
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
