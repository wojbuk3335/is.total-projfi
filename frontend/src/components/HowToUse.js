import React from 'react';
import './HowToUse.css';

const HowToUse = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
            <div style={{ width: '100%' }}>
                <img 
                    src={process.env.PUBLIC_URL + '/img/www_1.png'} 
                    alt="How to use" 
                    style={{ width: '100%', height: 'auto' }} 
                />
            </div>
            <div className="text_how_to_use">
                <p>
                    <img class="img-margin-right"  src={process.env.PUBLIC_URL + '/img/1.gif'} alt="Step 1" style={{ verticalAlign: 'middle' }} />
                    Każda część składa się z od dwóch do czterech modułów:<br /><br />
                    Moduł A – Co rozpoznasz? – umożliwia postawienie wstępnej diagnozy po pierwszym kontakcie z danym zapisem (odpowiedzi można później zmienić); <br /><br />
                    Moduł B – Co widzisz? (niekiedy Co widzisz i opiszesz?) – zawiera zestawienie konkretnych faktów medycznych, których część ma swoje odzwierciedlenie w danym zapisie EKG; użytkownik zaznacza poprawne wg niego odpowiedzi, po czym słucha omówienia wszystkich dostępnych;<br /><br />
                    Moduł C – Co opiszesz? – stanowi zestawienie wniosków, które można wysnuć na podstawie analizy elektrokardiogramu i elementów modułu B; użytkownik zaznacza poprawne wg niego odpowiedzi (stanowiące spójną i prawidłową diagnozę), po czym słucha omówienia, które wskazuje także poprawne odpowiedzi;<br /><br />
                    Moduł D – Co zrobisz? (dostępny tylko w przypadku niektórych elektrokardiogramów) – to zbiór czynności, które lekarz powinien uczynić (i tych, których uczynić nie powinien) po postawieniu poprawnej diagnozy; użytkownik zaznacza poprawne wg niego odpowiedzi, po czym słucha omówienia wszystkich dostępnych.<br />
                </p>
                <p>
                <img class="img-margin-right" src={process.env.PUBLIC_URL + '/img/2.gif'} alt="Step 2" style={{ verticalAlign: 'middle' }} /> Po wejściu do wybranej części na ekranie pojawi się zapis EKG, a jednocześnie włączy się film z komentarzem wprowadzający do problematyki danego przypadku.
                Użytkownik może w każdym momencie zatrzymać film, naciskając przycisk pauzy, albo przewinąć jego fragment, korzystając z dwóch sąsiadujących z nim przycisków (możliwość ta dotyczy wszystkich filmów w ramach aplikacji).
                </p>
                <p>
                <img class="img-margin-right" src={process.env.PUBLIC_URL + '/img/3.gif'} alt="Step 3" style={{ verticalAlign: 'middle' }} /> Po wysłuchaniu wprowadzenia i kliknięciu dużej strzałki w prawym dolnym rogu ekranu użytkownik zaznacza wszystkie odpowiedzi, które w jego mniemaniu dotyczą przedstawionego przypadku.
                W momencie wybrania danej odpowiedzi jej kolor zmienia się na żółty.
                </p>
                <p>
                <img  class="img-margin-right" src={process.env.PUBLIC_URL + '/img/4.gif'} alt="Step 4" style={{ verticalAlign: 'middle' }} /> Kliknięcie strzałki prowadzi do kolejnego modułu.
                </p>
                <p>
                <img class="img-margin-right" src={process.env.PUBLIC_URL + '/img/5.gif'} alt="Step 5" style={{ verticalAlign: 'middle' }} /> Zapis tekstowy komentarza autora
                </p>
            </div>
            <div className="text_how_to_use" style={{ width: '100%', borderTop: '2px solid white' }}>
                <img 
                    src={process.env.PUBLIC_URL + '/img/www_2.png'} 
                    alt="How to use" 
                    style={{ width: '100%', height: 'auto' }} 
                />
            </div>
            <div style={{ width: '100%', borderTop: '2px solid white' }}>
                <div className="text_how_to_use" >
                <p>
                <img class="img-margin-right"  src={process.env.PUBLIC_URL + '/img/1.gif'} alt="Step 1" style={{ verticalAlign: 'middle' }} />Podczas omówienia, ikony z cyframi przy prawidłowych odpowiedziach zmieniają kolor na żółty.
                </p>
                </div>

            </div>
            <div className="text_how_to_use" style={{ width: '100%', borderTop: '2px solid white' }}>
                <img 
                    src={process.env.PUBLIC_URL + '/img/www_3.png'} 
                    alt="How to use" 
                    style={{ width: '100%', height: 'auto' }} 
                />
            </div>
            <div  style={{ width: '100%', borderTop: '2px solid white' }}>
                <div className="text_how_to_use">
                <p>
                <img class="img-margin-right"  src={process.env.PUBLIC_URL + '/img/1.gif'} alt="Step 1" style={{ verticalAlign: 'middle' }} /> Przyciski oznaczone literami prowadzą do danych modułów. Użytkownik może przejrzeć swoje odpowiedzi i sprawdzić, gdzie popełnił ewentualne błędy. 
                </p>
                </div>
                <div className="text_how_to_use">
                <p>
                <img class="img-margin-right"  src={process.env.PUBLIC_URL + '/img/2.gif'} alt="Step 2" style={{ verticalAlign: 'middle' }} /> Przycisk Resetuj kasuje wyniki i przenosi do początku seminarium.
                </p>
                </div>

            </div>
        </div>
    );
}

export default HowToUse;