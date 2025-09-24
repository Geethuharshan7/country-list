import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { fetchCountries } from '../reducers/fetchCountries';

export default function Home(){
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((s) => s.countries);
    const [region, setRegion] = useState('All');
    const [visible, setVisible] = useState(10);
    const [slideIndex, setSlideIndex] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCountries());
        }
    }, [dispatch, status]);


    const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Polar'];


    const filtered = useMemo(() => {
        if (region === 'All') return items;
        return items.filter((c) => c.region === region);
    }, [items, region]);


    const visibleItems = filtered.slice(0, visible);

    const slides = filtered.slice(0, 4); // simple hero slider using first 4
    const prevSlide = () => setSlideIndex((i) => (i - 1 + slides.length) % slides.length);
    const nextSlide = () => setSlideIndex((i) => (i + 1) % slides.length);




    const  renderTopSection = () =>{
        return(
            <Row className="mb-3">
                <Col className="d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-between w-100">
                        <div style={{fontFamily:'Noto Sans',fontWeight:700,fontSize:'24px'}}>Countries</div>
                        <div className="d-none d-md-flex gap-4">
                        {regions.filter(info=>['All','Asia', 'Europe'].includes(info)).map((r) => (
                            <div onClick={() => {setRegion(r); setVisible(10);}} className="d-flex justify-content-center align-items-center " 
                            style={{padding:'0px 10px',borderBottom: (r===region)?'3px solid #6a6969':'none',color: (r===region)?'#1a1818':'#7a7777'}}> {r}</div>
                        ))}
                        </div>
                        <button 
                            className="d-md-none btn btn-link p-0" 
                            onClick={() => setDrawerOpen(true)}
                            style={{border: 'none', background: 'none', fontSize: '24px', color: '#1a1818',textDecoration:'none'}}
                        >
                            ☰
                        </button>
                    </div>
                </Col>


                <div class="d-flex align-items-center justify-content-center my-3" style={{paddingtop:'30px'}}>
                    <div class="d-none d-md-flex flex-grow-1 custom-border-top me-2"></div>
                        <h2 className="m-0 d-none d-md-flex">WELCOME</h2>
                        <h2 className="m-0 d-inline-block w-100 d-md-none text-center py-2" 
                        style={{ borderTop: '2px solid #5b5959', borderBottom: '2px solid #5b5959' }}>WELCOME</h2>
                    <div class="d-none d-md-flex flex-grow-1 custom-border-bottom ms-2"></div>
                </div> 
            </Row>
        )
    }

    const renderSlider = () =>(
        <Row className="mb-4 slider-height flex-column-reverse flex-md-row" >
            <Col md={9} className="mb-3">
                <Card className="h-100">
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center" style={{minHeight: 260}}>
                        {slides.length > 0 && (
                            <>
                                <img src={slides[slideIndex].flag} alt={slides[slideIndex].name} style={{maxHeight: 140}} />
                                <div className="mt-3">{slides[slideIndex].name}</div>
                                <div className="mt-3 d-flex align-items-center gap-3">
                                    <div variant="outline-dark" onClick={prevSlide}>◀</div>
                                    <div>
                                        {slides.map((_, idx) => (
                                            <span key={idx} style={{display:'inline-block', width:8, height:8, borderRadius:4, margin:'0 4px', backgroundColor: idx===slideIndex ? '#000' : '#ddd'}} />
                                        ))}
                                    </div>
                                    <div variant="outline-dark" onClick={nextSlide}>▶</div>
                                </div>
                            </>
                        )}
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3} className="mb-3">
                {slides[(slideIndex + 1) % slides.length] && (
                    <Card className="h-100">
                        <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center" style={{minHeight: 260}}>
                            <img src={slides[(slideIndex + 1) % slides.length].flag} alt={slides[(slideIndex + 1) % slides.length].name} style={{maxHeight: 140}} />
                            <div className="mt-3">{slides[(slideIndex + 1) % slides.length].name}</div>
                        </Card.Body>
                    </Card>
                )}
            </Col>
        </Row>
    )

    const renderCountryList = () =>{
        return(
            <div>
                
                <Row>
                    {visibleItems.map((c) => (
                        <Col md={6} className="mb-3" key={c.name}>
                            <Card>
                                <Card.Body className="d-flex align-items-center">
                                    <img src={c.flag} alt={c.name} style={{width:56, height:36, objectFit:'cover', marginRight:16}} />
                                    <div>
                                        <div className="fw-semibold">{c.name}</div>
                                        <div className="text-muted" style={{fontSize:12}}>{c.region}</div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {visible < filtered.length && (
                    <div className="text-center my-3">
                        <Button variant="dark" onClick={() => setVisible((v) => v + 10)}>Load more</Button>
                    </div>
                )}
            </div>
        )
    }


    const renderDrawer = () =>{
        return(
            
            <div  className="d-md-none position-fixed w-100 h-100" 
                style={{ top: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9}}
                onClick={() => setDrawerOpen(false)}>
                <div  className="position-fixed h-100 bg-white shadow"
                    style={{  top: 0, right: 0,  width: '280px', zIndex: 1051, overflowY: 'auto' }}
                    onClick={(e) => e.stopPropagation()}>
                    <div className="p-3">
                        <div className="d-flex justify-content-end align-items-center mb-4">
                            <button  className="btn btn-link p-0"  onClick={() => setDrawerOpen(false)}
                                style={{border: 'none', background: 'none', fontSize: '24px', color: '#1a1818'}}>
                                ×
                            </button>
                        </div>
                        
                        <div className="d-flex flex-column gap-3">
                            {regions.filter(info=>['All','Asia', 'Europe'].includes(info)).map((r) => (
                                <div  key={r} onClick={() => { setRegion(r);  setVisible(10);  setDrawerOpen(false);}} 
                                    className="p-3 rounded" 
                                    style={{ border: (r===region) ? '2px solid #6a6969' : '1px solid #e0e0e0',
                                        backgroundColor: (r===region) ? '#f8f8f8' : 'white',
                                        color: (r===region) ? '#1a1818' : '#7a7777',
                                        cursor: 'pointer',
                                        fontWeight: (r===region) ? 600 : 400,
                                        transition: 'all 0.2s ease' }}> 
                                    {r}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }

    return (
        <Container className="py-4 custom_width" style={{fontFamily:'Noto Sans',width:'100%'}}>
            {status === 'loading'?
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '500px' }}>
                  Loading...
                </div>
            :error?
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                  {String(error)}
                </div>
            :
                <div>
                    {renderTopSection()}
                    {renderSlider()}
                    {renderCountryList()}
                    {drawerOpen && renderDrawer()}
                </div>
            }
        </Container>
    );
}