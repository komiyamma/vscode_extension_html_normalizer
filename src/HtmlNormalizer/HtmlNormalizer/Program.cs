using System;
using HtmlAgilityPack;

class Program
{
    static void Main(string[] args)
    {
        if (args.Length == 0)
        {
            Console.WriteLine("Usage: HtmlNormalizer");
            return;
        }

        string filename = args[0];

        string text = System.IO.File.ReadAllText(filename);

        // HTMLを読み込んでHtmlDocumentオブジェクトとしてパース
        HtmlDocument doc = new HtmlDocument();
        doc.LoadHtml(text);
        doc.OptionAutoCloseOnEnd = false;

        // 正規化して再度HTML文字列として取得
        string normalizedHTML = doc.DocumentNode.OuterHtml;

        System.IO.File.WriteAllText(filename, normalizedHTML);
    }
}