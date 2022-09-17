

/*

==KPI FORM==
Guest - Isi laporan, lampiran, sumber, faskes
Admin - Update status, tindak lajut, tanggal klarifikasi

NO SIGN!!!!!!!

etc:
-MASTER DATA
-User
-Tipe Dokumen
-Program
--Sub Program
*/




import {
    Button,
    Col,
    Layout,
    Row,
    Skeleton,
    Space,
    Tag,
} from "antd";
import { Card } from "../../../atoms/Card/Card";
import { Title } from "../../../atoms/Title/Title";

import "./SatisfactionService.less";
import { InputSearch } from "../../../atoms/InputSearch/InputSearch";
import { OrderedListOutlined, PlusOutlined } from "@ant-design/icons";

import { useState } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../../../routing/paths";
import { SatisfactionServiceSider } from "../../../organism/Dashboard/Sider/SatisfactionServiceSider/SatisfactionServiceSider";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthToken } from "../../../../globals/useAuthToken";
import { SatisfactionServiceChart } from "../../../molecules/SatisfactionService/SatisfactionServiceChart";
import {
    getAllQualityIndicator,
    qualityIndicatorSelector,
} from "../../../../redux/modules/qualityIndicator/action";
import { FileTextOutlined } from "@ant-design/icons";
import { fetchApiGet } from "../../../../globals/fetchApi";
import { SatisfactionServiceCardView } from "./View/Cardview";
import { SatisfactionServiceListView } from "./View/ListView";

const { Content } = Layout;

export const SatisfactionService = () => {
    const [viewType, setViewType] = useState(1);
    const dispatch = useDispatch();
    const { getAccessToken } = useAuthToken();
    const accessToken = getAccessToken();
    const [programs, setPrograms] = useState([]);
    const [totalResult, setTotalResult] = useState({
        all: "78",
        selected: "75",
    });
    const [filter, setFilter] = useState({
        year: undefined,
        program_id: undefined,
        type: undefined,
    });
    const {
        data: { list },
        loading,
    } = useSelector(qualityIndicatorSelector);

    const fetchQuality = () => {
        dispatch(
            getAllQualityIndicator({
                accessToken,
                filter: {
                    year: filter.year !== undefined ? filter.year : "",
                    program_id: filter.program_id !== undefined ? filter.program_id : "",
                },
            })
        );
    };

    const fetchPrograms = () => {
        fetchApiGet("/program", { paginate: false }, accessToken).then((res) => {
            if (res && res.success) {
                setPrograms(res.data ?? []);
            }
        });
    };

    useEffect(() => {
        fetchPrograms();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchQuality();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    useEffect(() => {
        if (!list) return;
        fetchData(list);
    }, [list]);

    const handleChangeViewType = () => {
        setViewType(viewType === 1 ? 2 : 1);
    };

    const fetchData = (data) => {

    };

    return (
        <Layout>
            <SatisfactionServiceSider
                onFilter={(value) => {
                    setFilter(value)
                }}
            />
            <Content className="main-content">
                <Row justify="center" align="middle" gutter={[24, 16]}>
                    <Col>
                        <Card className="total">
                            <p className="card-title">KELUHAN MASUK</p>
                            <Title className="card-content">{totalResult.all}</Title>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="total">
                            <p className="card-title">KELUHAN TERTANGANI</p>
                            <Title className="card-content">{totalResult.selected}</Title>
                        </Card>
                    </Col>
                </Row>
                <Row style={{ marginTop: '30px' }}>
                    <Col span={24}>
                        <SatisfactionServiceChart
                            chartData={[
                                { month: 'JAN', capaian: 20 },
                                { month: 'FEB', capaian: 50 },
                                { month: 'MAR', capaian: 33 },
                                { month: 'APR', capaian: 40 },
                                { month: 'MEI', capaian: 80 },
                                { month: 'JUN', capaian: 94 },
                                { month: 'JUL', capaian: 75 },
                                { month: 'AGU', capaian: 21 },
                                { month: 'SEP', capaian: 64 },
                                { month: 'OKT', capaian: 83 },
                                { month: 'NOV', capaian: 22 },
                                { month: 'DES', capaian: 56 },
                            ]}
                            title={'Tingkat Kepuasan Layanan'}
                            average={80}
                            year={'Tahun Mutu 2022'}
                            className="indikator-mutu"
                            data={[]}
                        />
                    </Col>
                </Row>
                <Row justify="end" style={{ marginTop: 40 }} gutter={[8]}>
                    <Col>
                        <InputSearch size="large" />
                    </Col>
                    <Col>
                        <Link to={`${paths.ADD}`}>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                size="large"
                                style={{ borderRadius: 8 }}
                            />
                        </Link>
                    </Col>
                </Row>
                <Row style={{ marginTop: 40 }}>
                    <Col style={{ marginRight: "auto" }}>
                        <Space>
                            {filter.program_id ? (
                                programs.map((prog) => (
                                    filter.program_id.some((x) => x === prog.id) && (
                                        <Tag color="#6A9695">
                                            {prog.name}
                                        </Tag>
                                    )
                                ))
                            ) : (
                                <Tag color="#6A9695">SEMUA UNIT</Tag>
                            )}

                            {filter.year && <Tag color="#6A9695">{filter.year}</Tag>}
                            {filter.type && <Tag color="#6A9695">{filter.type === 'indicator_profile' ? 'PROFIL INDIKATOR' : filter.type === 'indicator' ? 'INDIKATOR MUTU' : 'SEMUA DOKUMEN'}</Tag>}
                        </Space>
                    </Col>
                    <Col style={{ marginLeft: "auto" }}>
                        <Button
                            type="primary"
                            icon={
                                viewType === 1 ? <OrderedListOutlined /> : <FileTextOutlined />
                            }
                            size="large"
                            style={{ borderRadius: 8 }}
                            onClick={handleChangeViewType}
                        />
                    </Col>
                </Row>
                <div className="indikator-mutu-container">
                    {!loading ? (
                        viewType === 1 ? (
                            <SatisfactionServiceCardView />
                        ) : (
                            <SatisfactionServiceListView />
                        )
                    ) : (
                        <Skeleton style={{ textAlign: "center" }}>Loading</Skeleton>
                    )}
                </div>
            </Content>
        </Layout>
    );
};
