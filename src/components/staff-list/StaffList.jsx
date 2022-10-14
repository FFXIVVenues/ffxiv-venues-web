import { StaffMember } from "./StaffMember";
import "./staff-list.css";

export function StaffList(props) {
    const staffList = <>
        <StaffMember name="Kana Ki" world="Gilgamesh" role="Engineering Lead" photoId="5370f299860d4771c8454e6dd5057ddc_b937560c841465f7c4bc8eb47ea7948afc0"  discordId="236852510688542720" />
        <StaffMember name="Sumi Satsuo" world="Jenova" role="Engineer" photoId="6adbef94cc3fa361f6a047330a0b9a44_ce736afe35e2ded4e46c4fd0659aef7efc0"  discordId="252142384303833088" />
        <StaffMember name="Allegro Vivo" world="Midgardsormr" role="Junior Engineer" photoId="82105c3e79b2a512772d26e56fcc8105_5c8ecfbc673e1287a9b5e85423fe1657fc0"  discordId="265695573527625731" />
        <StaffMember name="Ada Xumm" world="Coeurl" role="Photography Lead" photoId="d6583919ef6756c46ee9cac82110041a_284358f8eb4efc9095914e46798c6ab3fc0"  link="https://ada.xumm.ffxivphotography.com/#sfwo" />
        <StaffMember name="Kenta Jin" world="Jenova" role="Photographer" photoId="d4c7e12554774822191999bc9eb9a860_ce736afe35e2ded4e46c4fd0659aef7efc0"  discordId="713047627285004352" />
        <StaffMember name="Kaeda Destrian" world="Jenova" role="Community Engagement Lead" photoId="325546268785ccad39ac94c00b0e044a_ce736afe35e2ded4e46c4fd0659aef7efc0"  discordId="870413151676551178" />
        <StaffMember name="Calico Tyata" world="Excalibur" role="Community Engagement" photoId="ddc5f0aa93f8277ff8c20e89cf029707_745baffc465480ed372e274d50318290fc0"  discordId="53259864956211200" />
        <StaffMember name="Lanna'baker Kha" world="Cactuar" role="Administration Lead" photoId="8eb07e14239fb47e9535cf6f0bfdc9ba_96ab1df8877c1f8ba6a89a39cccfd437fc0"  discordId="880594476295389205" />
        <StaffMember name="Uchu Jupiter" world="Jenova" role="Senior Administrator" photoId="adb90390ac9bdd5a39a042dd5676c8c9_ce736afe35e2ded4e46c4fd0659aef7efc0"  discordId="99616043571380224" />
        <StaffMember name="Alitzia Kiryu" world="Siren" role="Senior Administrator" photoId="777dba0957855f16eba5fe0b902c0c37_58a84e851e55175d22158ca97af58a1ffc0"  discordId="158410288238952449" />
        <StaffMember name="Aruna Valkyria" world="Cactuar" role="Junior Administrator" photoId="4095422299d95965ea3e401de871219a_96ab1df8877c1f8ba6a89a39cccfd437fc0"  discordId="391318826819780618" />
    </>;
    return <div className={`staff-list ${props.className || ''}`}>
        {
            props.collapsible
            ? 
                <details className="staff-list__details">
                    <summary className="staff-list__summary">Meet the staff</summary>
                    {staffList}
                </details> 
            : 
            <>{staffList}</>
        }
    </div>
}