import firebase from 'firebase';

export default class Office {
    /** Document id of the News document. */
    docId?: string;

    /**Pdf Url */
    byLawsPdf?: string;

    /**Pdf Url */
    leagueRulesPdf?: string;

    /**Pdf Url */
    knockoutRulesPdf?: string;

    /**Pdf Url */
    accountsPdf?: string;

    set setByLawsPdf(url: string) {
        this.byLawsPdf = url;
    }
    set setLeagueRulesPdf(url: string) {
        this.leagueRulesPdf = url;
    }
    set setKnockoutRulesPdf(url: string) {
        this.knockoutRulesPdf = url;
    }
    set setAccountsPdf(url: string) {
        this.accountsPdf = url;
    }

    constructor({
        docId,
        byLawsPdf,
        leagueRulesPdf,
        knockoutRulesPdf,
        accountsPdf,
    }: {
        docId?: string;
        byLawsPdf?: string;
        leagueRulesPdf?: string;
        knockoutRulesPdf?: string;
        accountsPdf?: string;
    }) {
        if (docId) this.docId = docId;
        if (byLawsPdf) this.byLawsPdf = byLawsPdf;
        if (leagueRulesPdf) this.leagueRulesPdf = leagueRulesPdf;
        if (knockoutRulesPdf) this.knockoutRulesPdf = knockoutRulesPdf;
        if (accountsPdf) this.accountsPdf = accountsPdf;
    }

    static fromFirestore(doc: firebase.firestore.DocumentSnapshot): Office {
        return new Office({
            docId: doc.id,
            byLawsPdf: doc.data()?.byLawsPdf,
            leagueRulesPdf: doc.data()?.leagueRulesPdf,
            knockoutRulesPdf: doc.data()?.knockoutRulesPdf,
            accountsPdf: doc.data()?.accountsPdf,
        });
    }
}
